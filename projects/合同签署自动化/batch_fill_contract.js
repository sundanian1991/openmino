/**
 * 京东星空电子签约平台 - 批量合同填写脚本
 * 通过 Playwright MCP browser_run_code 执行
 *
 * 使用方式（优化后 - 单次 browser_run_code 完成全部）：
 *   1. Python 导出 Excel 为 JSON: cat export_excel.py > /tmp/contracts_27.json
 *   2. 浏览器打开星空列表页 https://xingkong.jd.com/qudao/793559463196729346
 *   3. 逐供应商执行全流程代码（含新建E签→意向→模板→合同信息→模板变量→签约主体→发票→保存）
 *
 * 关键坑与解决方案（2026-05-29 实际跑27家总结）：
 *   - 合作意向: 自定义 findRelated 组件，非 el-select。打开 dialog → 搜索 → 选 radio → 确定
 *     * 搜索词避免特殊字符（括号等），用公司名前2-4个汉字即可
 *     * 确定后加 2.5s wait + Escape 防止 dialog 未关闭阻塞后续操作
 *   - 合同模板: el-select remote，必须通过 Vue remoteMethod + $emit 操作
 *   - 普通选择器: click input → wait → 遍历 .el-select-dropdown__item 匹配文本
 *   - 签约方标识: 浮动 listitem，browser_run_code 内可点击客方（.first()）+ 完成
 *     * 我方需 page.evaluate 绕开 Playwright 可见性检查:
 *       document.querySelectorAll('input[placeholder="请选择签约方标识"]')[last] 点击
 *     * 我方完成: page.evaluate 遍历 button 找 textContent==='完成' 点击
 *   - 发票税率: force click（被 tags 元素遮挡）
 *   - 模板变量: 批量 fill by placeholder 模式 "请输入$!{xxx}"
 *   - 合同开始/结束时间: fill 后需 Enter 确认
 *
 * 单次调用 ~38 秒/供应商，全部27家约17分钟。
 */

// ==================== 工具函数 ====================

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * 远程搜索选择器 - 通过 Vue 实例调 remoteMethod
 * @param {Page} page
 * @param {string} placeholder - input 的 placeholder 文本
 * @param {string} searchText - 搜索关键词
 * @param {Function} matchFn - (option: {label, value}) => boolean 匹配函数
 * @returns {{label: string, value: string}|null}
 */
async function remoteSelect(page, placeholder, searchText, matchFn) {
  // 调用 remoteMethod 触发搜索
  await page.evaluate(({ ph, st }) => {
    const input = document.querySelector(`input[placeholder="${ph}"]`);
    const vue = input.closest('.el-select').__vue__;
    vue.$props.remoteMethod(st);
  }, { ph: placeholder, st: searchText });
  await sleep(2000);

  // 获取搜索结果
  const options = await page.evaluate(({ ph }) => {
    const input = document.querySelector(`input[placeholder="${ph}"]`);
    const vue = input.closest('.el-select').__vue__;
    return (vue.options || []).map(o => ({ label: o.label || o.currentLabel, value: o.value }));
  }, { ph: placeholder });

  // 匹配目标选项
  const target = options.find(matchFn);
  if (!target) {
    console.log(`[WARN] remoteSelect 未匹配: ${placeholder}, search="${searchText}", options=${JSON.stringify(options.slice(0, 5))}`);
    return null;
  }

  // 通过 Vue emit 设置值
  await page.evaluate(({ ph, val }) => {
    const input = document.querySelector(`input[placeholder="${ph}"]`);
    const vue = input.closest('.el-select').__vue__;
    vue.$emit('input', val);
    vue.$emit('change', val);
  }, { ph: placeholder, val: target.value });
  await sleep(500);

  return target;
}

/**
 * 普通选择器 - 点击打开下拉，选择选项
 */
async function normalSelect(page, placeholder, optionText) {
  const input = page.getByRole('textbox', { name: placeholder });
  await input.click();
  await sleep(500);
  // 精确匹配选项
  const items = page.locator('.el-select-dropdown__item');
  const count = await items.count();
  for (let i = 0; i < count; i++) {
    const text = (await items.nth(i).textContent()).trim();
    if (text === optionText) {
      await items.nth(i).click();
      await sleep(300);
      return true;
    }
  }
  // 模糊匹配
  for (let i = 0; i < count; i++) {
    const text = (await items.nth(i).textContent()).trim();
    if (text.includes(optionText)) {
      await items.nth(i).click();
      await sleep(300);
      return true;
    }
  }
  await page.keyboard.press('Escape');
  return false;
}

/**
 * 批量填写 input（通过 placeholder 匹配）
 */
async function batchFill(page, fields) {
  const results = [];
  for (const [placeholder, value] of fields) {
    if (!value && value !== '0' && value !== '/') continue;
    try {
      const input = page.getByRole('textbox', { name: placeholder });
      await input.fill(String(value));
      results.push(`OK: ${placeholder}`);
    } catch (e) {
      results.push(`FAIL: ${placeholder} - ${e.message.substring(0, 60)}`);
    }
  }
  return results;
}

// ==================== 核心流程 ====================

/**
 * 填写单个合同
 * @param {Page} page - Playwright page 对象
 * @param {Object} record - Excel 数据记录
 * @returns {{success: boolean, errors: string[], log: string[]}}
 */
async function fillOneContract(page, record) {
  const errors = [];
  const log = [];
  const name = record['供应商名称'];
  const idx = record['序号'];
  const prefix = `[${idx}-${name}]`;

  try {
    // ===== 0. 点击"新建e签" =====
    log.push(`${prefix} 步骤0: 新建e签`);
    const newBtn = page.getByRole('button', { name: '新建e签' });
    try {
      await newBtn.click({ timeout: 5000 });
    } catch {
      // 尝试其他文本
      try {
        await page.getByRole('button', { name: '新建一签' }).click({ timeout: 3000 });
      } catch {
        errors.push('找不到新建按钮');
        return { success: false, errors, log };
      }
    }
    await sleep(3000);

    // ===== 1. 合作意向 (remote select) =====
    log.push(`${prefix} 步骤1: 合作意向`);
    const intentResult = await remoteSelect(
      page,
      '请选择合作意向',
      name,
      (opt) => opt.label.includes(name.substring(0, 4)) || opt.label.includes('存量续签')
    );
    if (!intentResult) {
      errors.push('合作意向未匹配');
      log.push(`  [WARN] 合作意向搜索无结果: ${name}`);
    } else {
      log.push(`  合作意向: ${intentResult.label}`);
    }
    await sleep(1000);

    // ===== 2. 合同模板 (remote select) =====
    log.push(`${prefix} 步骤2: 合同模板`);
    const templateResult = await remoteSelect(
      page,
      '请选择合同模板',
      '客户服务外包合同',
      (opt) => opt.label.includes('客户服务外包合同-202604')
    );
    if (!templateResult) {
      errors.push('合同模板未匹配');
    }
    await sleep(2000);

    // ===== 3. 合同信息 =====
    log.push(`${prefix} 步骤3: 合同信息`);

    // 合同名称
    const contractName = record['合同名称'] || `${name}-客户服务外包合`;
    await page.getByRole('textbox', { name: '请输入合同名称' }).fill(contractName);
    await sleep(300);

    // 合同类型
    await normalSelect(page, '请选择合同类型', '渠道主协议');
    await sleep(500);

    // 资金流向
    await normalSelect(page, '请选择资金流向', '支出');
    await sleep(300);

    // 合同金额
    const amount = String(record['合同金额(元)'] || '0').replace(/\.0+$/, '');
    await page.getByRole('textbox', { name: '请输入合同金额(元)' }).fill(amount);
    await sleep(300);

    // 合同开始/结束时间
    const startDate = (record['合同开始时间'] || '2026-06-01').replace(/\//g, '-');
    const endDate = (record['合同结束时间'] || '2027-05-31').replace(/\//g, '-');
    await page.getByRole('textbox', { name: '请选择合同开始时间' }).fill(startDate);
    await page.keyboard.press('Enter');
    await sleep(300);
    await page.getByRole('textbox', { name: '请选择合同结束时间' }).fill(endDate);
    await page.keyboard.press('Enter');
    await sleep(300);

    // 是否宿迁承接对账 - 选"是"
    try {
      const radios = page.locator('text=是否宿迁承接对账').locator('xpath=../..').locator('.el-radio');
      if (await radios.count() > 0) {
        const yesLabel = radios.locator('text=是');
        if (await yesLabel.count() > 0) {
          await yesLabel.first().click();
          log.push('  是否宿迁承接对账: 是');
        }
      }
    } catch {}

    // 合同标的 (textarea)
    try {
      await page.getByRole('textbox', { name: '请输入合同标的' }).fill(record['合同标的'] || '电销服务');
    } catch {
      // 可能是 textarea
      const ta = page.locator('textarea[placeholder="请输入合同标的"]');
      if (await ta.count() > 0) await ta.fill(record['合同标的'] || '电销服务');
    }
    await sleep(300);

    // 合同说明 (textarea)
    const desc = record['合同说明'] || '2026年BPO供应商合作协议换签，本次为供应商换签新协议，无新引入供应商；';
    try {
      await page.getByRole('textbox', { name: '请输入合同说明' }).fill(desc);
    } catch {
      const ta = page.locator('textarea[placeholder="请输入合同说明"]');
      if (await ta.count() > 0) await ta.fill(desc);
    }
    await sleep(500);

    // ===== 4. 模板变量 =====
    log.push(`${prefix} 步骤4: 模板变量`);
    const templateVars = [
      ['$!{party_b_name}', record['${party_b_name}'] || name],
      ['$!{party_b_address}', record['${party_b_address}'] || record['乙方地址'] || ''],
      ['$!{party_b_phone}', record['${party_b_phone}'] || record['乙方电话'] || ''],
      ['$!{party_b_contact_email}', record['${party_b_contact_email}'] || record['乙方联系人邮箱'] || ''],
      ['$!{party_b_contact_person}', record['${party_b_contact_person}'] || record['乙方联系人'] || ''],
      ['$!{trial_period}', record['${trial_period}'] || '/'],
      ['$!{trial_start_year}', record['${trial_start_year}'] || '/'],
      ['$!{trial_start_month}', record['${trial_start_month}'] || '/'],
      ['$!{trial_start_day}', record['${trial_start_day}'] || '/'],
      ['$!{trial_end_year}', record['${trial_end_year}'] || '/'],
      ['$!{trial_end_month}', record['${trial_end_month}'] || '/'],
      ['$!{trial_end_day}', record['${trial_end_day}'] || '/'],
      ['$!{renewal_start_year}', record['${renewal_start_year}'] || '2026'],
      ['$!{renewal_start_month}', record['${renewal_start_month}'] || '6'],
      ['$!{renewal_start_day}', record['${renewal_start_day}'] || '1'],
      ['$!{renewal_end_year}', record['${renewal_end_year}'] || '2027'],
      ['$!{renewal_end_month}', record['${renewal_end_month}'] || '5'],
      ['$!{renewal_end_day}', record['${renewal_end_day}'] || '31'],
      ['$!{party_b_email}', record['${party_b_email}'] || record['乙方邮箱'] || ''],
      ['$!{account_name}', record['${account_name}'] || record['账户名'] || name],
      ['$!{account_number}', record['${account_number}'] || record['银行账号'] || ''],
      ['$!{bank_name}', record['${bank_name}'] || record['开户行'] || ''],
      ['$!{uniform_credit_code}', record['${uniform_credit_code}'] || record['统一信用代码'] || ''],
    ];

    const fillResults = await batchFill(page, templateVars.map(([ph, v]) => [`请输入${ph}`, v]));
    const failCount = fillResults.filter(r => r.startsWith('FAIL')).length;
    if (failCount > 0) {
      log.push(`  模板变量: ${fillResults.length - failCount}/${fillResults.length} OK`);
      errors.push(`模板变量 ${failCount} 个填写失败`);
    } else {
      log.push(`  模板变量: 全部 ${fillResults.length} 个 OK`);
    }
    await sleep(500);

    // ===== 5. 签约主体 =====
    log.push(`${prefix} 步骤5: 签约主体`);

    // 客方签约主体 - 搜索供应商名
    const creditCode = record['统一信用代码'] || record['客方统一信用代码'] || '';
    const partnerSearchResult = await remoteSelect(
      page,
      '请选择客方主体',
      name.substring(0, 4),
      (opt) => opt.label.includes(name.substring(0, 4))
    );
    if (!partnerSearchResult) {
      // 回退: 直接 fill
      try {
        await page.getByRole('textbox', { name: '请选择客方主体' }).fill(name, { force: true });
      } catch {}
    }
    await sleep(500);

    // 填写客方统一信用代码
    try {
      const creditInput = page.getByRole('textbox', { name: '请输入统一信用代码' });
      if (await creditInput.count() > 0) {
        await creditInput.fill(creditCode);
      }
    } catch {}
    await sleep(300);

    // 客方是否申请主体: 否
    try { await normalSelect(page, '请选择是否申请主体', '否'); } catch {}
    await sleep(300);

    // 客方签约方标识: 乙方
    try { await normalSelect(page, '请选择签约方标识', '乙方'); } catch {}
    await sleep(300);

    // 客方点完成
    try {
      const completeBtns = page.getByRole('button', { name: '完成' });
      if (await completeBtns.count() > 0) {
        await completeBtns.first().click();
        await sleep(1000);
      }
    } catch {}
    await sleep(500);

    // 我方签约主体 - 搜索京东科技
    const ourResult = await remoteSelect(
      page,
      '请选择我方主体',
      '京东科技控股',
      (opt) => opt.label.includes('京东科技控股股份有限公司')
    );
    if (!ourResult) {
      log.push('  [WARN] 我方主体搜索失败，尝试直接填写');
      try {
        await page.getByRole('textbox', { name: '请选择我方主体' }).fill('京东科技控股股份有限公司', { force: true });
      } catch {}
    }
    await sleep(500);

    // 我方统一信用代码
    try {
      const ourCreditInput = page.locator('input[placeholder*="统一信用代码"]').last();
      if (await ourCreditInput.count() > 0) {
        await ourCreditInput.fill('91110302053604529E');
      }
    } catch {}
    await sleep(300);

    // 我方是否申请主体: 是
    try { await normalSelect(page, '请选择是否申请主体', '是'); } catch {}
    await sleep(300);

    // 我方签约方标识: 甲方
    try { await normalSelect(page, '请选择签约方标识', '甲方'); } catch {}
    await sleep(300);

    // 我方点完成
    try {
      const completeBtns = page.getByRole('button', { name: '完成' });
      if (await completeBtns.count() > 0) {
        await completeBtns.first().click();
        await sleep(1000);
      }
    } catch {}
    await sleep(500);

    // ===== 6. 发票信息 =====
    log.push(`${prefix} 步骤6: 发票信息`);

    // 发票类型
    await normalSelect(page, '请选择发票类型', '增值税专用发票');
    await sleep(500);

    // 开票税率 (force click)
    const taxInput = page.getByRole('textbox', { name: '请选择开票税率' });
    await taxInput.click({ force: true });
    await sleep(800);
    const taxItems = page.locator('.el-select-dropdown__item');
    const taxCount = await taxItems.count();
    for (let i = 0; i < taxCount; i++) {
      const t = (await taxItems.nth(i).textContent()).trim();
      if (t === '6%') {
        await taxItems.nth(i).click();
        break;
      }
    }
    await sleep(500);

    // ===== 7. 保存 =====
    log.push(`${prefix} 步骤7: 保存`);
    const saveBtn = page.getByRole('button', { name: '保存' });
    if (await saveBtn.count() > 0) {
      await saveBtn.click();
      await sleep(3000);
      log.push('  已点击保存');
    }

    // 等待页面跳转回列表
    await sleep(2000);

    return { success: errors.length === 0, errors, log };

  } catch (e) {
    errors.push(`严重错误: ${e.message}`);
    return { success: false, errors, log };
  }
}

// ==================== 导出 ====================
// 返回函数供外部使用
return { fillOneContract, remoteSelect, normalSelect, batchFill };
