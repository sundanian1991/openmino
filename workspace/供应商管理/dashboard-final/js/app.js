/**
 * 应用主逻辑 - 看板控制器
 */

const DashboardApp = {
  // 状态
  state: {
    currentData: null,
    currentTab: 'overview',
    filters: {
      product: 'all',
      province: 'all',
      time: 'all',
      size: 'all'
    },
    renderedTabs: new Set()
  },

  /**
   * 初始化应用
   */
  async init() {
    console.log('🚀 人力看板初始化中...');
    
    try {
      // 尝试加载默认 Excel 文件
      await this.loadDefaultData();
      
      // 初始化 UI
      this.initUI();
      
      // 渲染初始视图
      this.render();
      
      // 绑定事件
      this.bindEvents();
      
      console.log('✅ 看板初始化完成');
    } catch (error) {
      console.error('❌ 初始化失败:', error);
      this.showError('数据加载失败: ' + error.message);
    }
  },

  /**
   * 加载默认数据文件
   */
  async loadDefaultData() {
    // 本地文件系统无法使用 fetch 加载 Excel，直接使用模拟数据
    // 用户可以通过拖拽上传真实数据文件
    console.log('ℹ️ 使用模拟数据（请拖拽 Excel 文件上传真实数据）');
    this.state.currentData = this.getMockData();
  },

  /**
   * 从文件加载数据（拖拽/选择）
   */
  async loadFromFile(file) {
    try {
      const data = await dataLoader.loadExcel(file);
      this.state.currentData = data;
      this.render();
      this.showMessage('数据加载成功！');
    } catch (error) {
      this.showError('文件读取失败: ' + error.message);
    }
  },

  /**
   * 初始化 UI
   */
  initUI() {
    // 初始化省份筛选选项
    this.initProvinceFilter();
    
    // 更新 KPI 显示
    this.updateKPIs();
  },

  /**
   * 初始化省份筛选器
   */
  initProvinceFilter() {
    const select = document.getElementById('filter-province');
    if (!select || !this.state.currentData) return;
    
    const provinces = Object.keys(this.state.currentData.provinces || {}).sort();
    
    // 清空并重新添加选项
    select.innerHTML = '<option value="all">全部省份</option>';
    provinces.forEach(prov => {
      const option = document.createElement('option');
      option.value = prov;
      option.textContent = prov;
      select.appendChild(option);
    });
  },

  /**
   * 渲染看板
   */
  render() {
    if (!this.state.currentData) return;
    
    this.updateKPIs();
    
    // 根据当前 tab 渲染对应内容
    switch (this.state.currentTab) {
      case 'overview':
        this.renderOverview();
        break;
      case 'workplace':
        this.renderWorkplace();
        break;
      case 'supplier':
        this.renderSupplier();
        break;
      case 'product':
        this.renderProduct();
        break;
      case 'alert':
        this.renderAlert();
        break;
    }
  },

  /**
   * 更新 KPI 卡片
   */
  updateKPIs() {
    const data = this.state.currentData;
    if (!data) return;
    
    // 计算关键指标
    const monthlyValues = Object.values(data.monthly || {});
    const totalHeadcount = monthlyValues.reduce((a, b) => a + b, 0);
    const avgHeadcount = Math.round(totalHeadcount / 12);
    const maxHeadcount = Math.max(...monthlyValues);
    const minHeadcount = Math.min(...monthlyValues.filter(v => v > 0));
    const supplierCount = Object.keys(data.suppliers || {}).length;
    const workplaceCount = Object.keys(data.workplaces || {}).length;
    
    // 更新 DOM
    this.updateKPICard('kpi-total', avgHeadcount.toLocaleString());
    this.updateKPICard('kpi-suppliers', supplierCount.toString());
    this.updateKPICard('kpi-workplaces', workplaceCount.toString());
    this.updateKPICard('kpi-max', maxHeadcount.toLocaleString());
    this.updateKPICard('kpi-min', minHeadcount.toLocaleString());
  },

  /**
   * 更新单个 KPI 卡片
   */
  updateKPICard(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  },

  /**
   * 渲染全局概览页
   */
  renderOverview() {
    const data = this.getFilteredData();
    if (!data) {
      console.warn('⚠️ 没有数据可渲染');
      return;
    }
    
    console.log('📊 渲染全局概览页');
    
    // 延迟渲染确保 DOM 就绪
    setTimeout(() => {
      // 清除旧图表
      Charts.clearAll();
      
      // 渲染图表
      Charts.trend(data, 'overview-trend');
      Charts.supplierBar(data, 'overview-supplier');
      Charts.workplacePie(data, 'overview-workplace');
      Charts.provinceMap(data, 'overview-map');
      
      this.state.renderedTabs.add('overview');
    }, 100);
  },

  /**
   * 渲染职场视角
   */
  renderWorkplace() {
    const data = this.getFilteredData();
    Charts.clearAll();
    Charts.workplacePie(data, 'workplace-pie');
    Charts.monthlyBar(data, 'workplace-bar');
    this.state.renderedTabs.add('workplace');
  },

  /**
   * 渲染供应商视角
   */
  renderSupplier() {
    const data = this.getFilteredData();
    Charts.clearAll();
    Charts.supplierBar(data, 'supplier-bar');
    Charts.monthlyBar(data, 'supplier-monthly');
    this.state.renderedTabs.add('supplier');
  },

  /**
   * 渲染产品线视角
   */
  renderProduct() {
    const data = this.getFilteredData();
    Charts.clearAll();
    Charts.productPie(data, 'product-pie');
    Charts.monthlyBar(data, 'product-bar');
    this.state.renderedTabs.add('product');
  },

  /**
   * 渲染预警中心
   */
  renderAlert() {
    // 预警逻辑
    const alerts = this.generateAlerts();
    this.renderAlertList(alerts);
    this.state.renderedTabs.add('alert');
  },

  /**
   * 获取筛选后的数据
   */
  getFilteredData() {
    // 简化版：返回全部数据
    // 实际应根据 this.state.filters 进行筛选
    return this.state.currentData;
  },

  /**
   * 生成预警信息
   */
  generateAlerts() {
    const alerts = [];
    const data = this.state.currentData;
    
    if (!data) return alerts;
    
    // 人力波动预警
    const monthlyValues = Object.values(data.monthly || {});
    for (let i = 1; i < monthlyValues.length; i++) {
      const change = monthlyValues[i] - monthlyValues[i - 1];
      const changePercent = (change / monthlyValues[i - 1]) * 100;
      
      if (Math.abs(changePercent) > 20) {
        alerts.push({
          type: change > 0 ? 'warning' : 'info',
          title: `${MONTHS[i]}人力${change > 0 ? '激增' : '下降'}`,
          message: `环比${change > 0 ? '增长' : '下降'}${Math.abs(changePercent).toFixed(1)}%，${change > 0 ? '需关注承载能力' : '需关注业务稳定性'}`
        });
      }
    }
    
    return alerts;
  },

  /**
   * 渲染预警列表
   */
  renderAlertList(alerts) {
    const container = document.getElementById('alert-list');
    if (!container) return;
    
    if (alerts.length === 0) {
      container.innerHTML = '<div class="alert-empty">暂无预警信息</div>';
      return;
    }
    
    container.innerHTML = alerts.map(alert => `
      <div class="alert-item alert-${alert.type}">
        <div class="alert-title">${alert.title}</div>
        <div class="alert-message">${alert.message}</div>
      </div>
    `).join('');
  },

  /**
   * 绑定事件
   */
  bindEvents() {
    // Tab 切换
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = e.target.dataset.tab;
        if (tab) this.switchTab(tab, e.target);
      });
    });
    
    // 筛选器变化
    document.querySelectorAll('.filter-group select').forEach(select => {
      select.addEventListener('change', () => this.applyFilters());
    });
    
    // 窗口大小变化
    window.addEventListener('resize', () => {
      Charts.resizeAll();
    });
    
    // 文件拖拽
    this.bindFileDrop();
  },

  /**
   * 切换 Tab
   */
  switchTab(tabId, el) {
    if (!el) {
      el = document.querySelector(`[data-tab="${tabId}"]`);
    }
    if (!el) return;
    
    // 更新导航状态
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    
    // 更新页面显示
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(tabId);
    if (page) page.classList.add('active');
    
    this.state.currentTab = tabId;
    
    // 延迟渲染以确保 DOM 就绪
    setTimeout(() => this.render(), 100);
  },

  /**
   * 应用筛选
   */
  applyFilters() {
    this.state.filters = {
      product: document.getElementById('filter-product')?.value || 'all',
      province: document.getElementById('filter-province')?.value || 'all',
      time: document.getElementById('filter-time')?.value || 'all',
      size: document.getElementById('filter-size')?.value || 'all'
    };
    
    this.render();
  },

  /**
   * 重置筛选
   */
  resetFilters() {
    document.querySelectorAll('.filter-group select').forEach(select => {
      select.value = 'all';
    });
    this.applyFilters();
  },

  /**
   * 绑定文件拖拽
   */
  bindFileDrop() {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    
    dropZone.addEventListener('dragenter', () => dropZone.classList.add('drag-over'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    
    dropZone.addEventListener('drop', (e) => {
      dropZone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.loadFromFile(files[0]);
      }
    });
    
    // 文件选择
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.loadFromFile(e.target.files[0]);
        }
      });
    }
  },

  /**
   * 显示消息
   */
  showMessage(msg) {
    // 简化版：console 输出
    console.log('📢', msg);
    // 实际可添加 toast 提示
  },

  /**
   * 显示错误
   */
  showError(msg) {
    console.error('❌', msg);
    alert(msg);
  },

  /**
   * 模拟数据（备用）
   */
  getMockData() {
    return {
      months: MONTHS,
      monthly: {
        '1月': 3219, '2月': 2998, '3月': 3247, '4月': 3266,
        '5月': 3440, '6月': 3504, '7月': 3656, '8月': 3688,
        '9月': 3639, '10月': 4057, '11月': 4041, '12月': 4034
      },
      suppliers: {
        '陕西海腾信息科技有限公司': 6715,
        '河北创博信息技术有限公司': 5607,
        '合肥毅航通信技术有限公司': 4854
      },
      workplaces: {
        '含光路职场': 4781,
        '通达花园职场': 2437,
        '安定东职场': 2337
      },
      provinces: {
        '陕西': 8500,
        '河北': 7200,
        '安徽': 6500
      },
      products: {
        '金条': 8000,
        '企业金融': 6000,
        '信用卡': 5000,
        '财富': 4000
      },
      details: []
    };
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  DashboardApp.init();
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DashboardApp };
}
