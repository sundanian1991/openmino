/*
 * Data layer - 供应商管理仪表板
 * Birchline Design System - 暖色调、克制
 */
(function () {
  const DATA = {
    personas: {
      'empty': {
        user: { name: '王经理', initials: 'WM', role: '供应商管理岗' },
        stats: { activeCount: 0, warningCount: 0, totalSpend: 0, totalHeadcount: 0 },
        suppliers: [],
        notifications: []
      },
      'normal': {
        user: { name: '王经理', initials: 'WM', role: '供应商管理岗' },
        stats: { activeCount: 6, warningCount: 2, totalSpend: 27600000, totalHeadcount: 3930 },
        suppliers: [
          { id: 1, name: '毅航科技', status: 'active', compliance: 98, spend: 8500000, headcount: 1200, location: '北京' },
          { id: 2, name: '毛毛虫服务', status: 'active', compliance: 95, spend: 6200000, headcount: 890, location: '上海' },
          { id: 3, name: '伽玛外包', status: 'warning', compliance: 82, spend: 4100000, headcount: 650, location: '广州' },
          { id: 4, name: '赛维斯人力', status: 'active', compliance: 91, spend: 3800000, headcount: 520, location: '深圳' },
          { id: 5, name: '岐力咨询', status: 'warning', compliance: 78, spend: 2900000, headcount: 380, location: '成都' },
          { id: 6, name: '翰锐实业', status: 'active', compliance: 94, spend: 2100000, headcount: 290, location: '杭州' }
        ],
        notifications: [
          { type: 'warning', text: '岐力咨询合规率低于 80%', time: '2小时前' },
          { type: 'info', text: '毅航科技月度绩效已更新', time: '5小时前' }
        ]
      },
      'power': {
        user: { name: '王总监', initials: 'WZ', role: '服务组负责人' },
        stats: { activeCount: 8, warningCount: 3, totalSpend: 30300000, totalHeadcount: 4290 },
        suppliers: [
          { id: 1, name: '毅航科技', status: 'active', compliance: 98, spend: 8500000, headcount: 1200, location: '北京' },
          { id: 2, name: '毛毛虫服务', status: 'active', compliance: 95, spend: 6200000, headcount: 890, location: '上海' },
          { id: 3, name: '伽玛外包', status: 'warning', compliance: 82, spend: 4100000, headcount: 650, location: '广州' },
          { id: 4, name: '赛维斯人力', status: 'active', compliance: 91, spend: 3800000, headcount: 520, location: '深圳' },
          { id: 5, name: '岐力咨询', status: 'warning', compliance: 78, spend: 2900000, headcount: 380, location: '成都' },
          { id: 6, name: '翰锐实业', status: 'active', compliance: 94, spend: 2100000, headcount: 290, location: '杭州' },
          { id: 7, name: '鼎盛外包', status: 'active', compliance: 89, spend: 1800000, headcount: 240, location: '武汉' },
          { id: 8, name: '华信人力', status: 'inactive', compliance: 45, spend: 900000, headcount: 120, location: '西安' }
        ],
        notifications: [
          { type: 'urgent', text: '华信人力合规严重不达标，建议清退', time: '1小时前' },
          { type: 'warning', text: '岐力咨询合规率低于 80%', time: '2小时前' },
          { type: 'info', text: 'Q2 供应商评估会议即将开始', time: '1天前' }
        ]
      }
    },

    shared: {
      statusLabels: { active: '正常', warning: '预警', inactive: '停用' }
    }
  };

  function getPersona(name) {
    return DATA.personas[name] || DATA.personas['normal'];
  }

  function resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function formatCurrency(num) {
    if (num >= 100000000) return (num / 100000000).toFixed(2) + '亿';
    if (num >= 10000) return (num / 10000).toFixed(0) + '万';
    return num.toString();
  }

  function formatNumber(num) {
    return num.toLocaleString('zh-CN');
  }

  function apply(personaName) {
    const persona = getPersona(personaName);

    document.querySelectorAll('[data-persona-text]').forEach(el => {
      const path = el.dataset.personaText;
      let value = resolve(persona, path);
      if (value !== undefined && value !== null) {
        if (path.includes('totalSpend') || path.includes('spend')) {
          value = formatCurrency(value);
        } else if (path.includes('headcount') || path.includes('Count')) {
          value = formatNumber(value);
        }
        el.textContent = String(value);
      }
    });

    document.querySelectorAll('[data-persona-show]').forEach(el => {
      const targets = el.dataset.personaShow.split(/\s+/).filter(Boolean);
      const shouldHide = !targets.includes(personaName);
      el.style.display = shouldHide ? 'none' : '';
    });

    document.querySelectorAll('[data-persona-hide]').forEach(el => {
      const targets = el.dataset.personaHide.split(/\s+/).filter(Boolean);
      const shouldHide = targets.includes(personaName);
      el.style.display = shouldHide ? 'none' : '';
    });

    const supplierList = document.querySelector('[data-supplier-list]');
    if (supplierList && persona.suppliers) {
      supplierList.innerHTML = '';
      persona.suppliers.forEach(s => {
        const row = document.createElement('div');
        row.className = 'table-row';
        const complianceClass = s.compliance >= 90 ? 'compliance-high' : s.compliance >= 80 ? 'compliance-medium' : 'compliance-low';
        row.innerHTML = `
          <div>
            <div class="cell-primary">${s.name}</div>
            <div class="cell-secondary">${s.location}</div>
          </div>
          <div class="cell-mono">${formatNumber(s.headcount)}</div>
          <div class="cell-mono">¥${formatCurrency(s.spend)}</div>
          <div class="compliance ${complianceClass}">${s.compliance}%</div>
          <div class="status status-${s.status}">
            <span class="status-dot"></span>
            <span>${DATA.shared.statusLabels[s.status]}</span>
          </div>
        `;
        row.addEventListener('click', () => {
          if (window.State) State.set('supplier', s.id);
        });
        supplierList.appendChild(row);
      });
    }

    const notificationList = document.querySelector('[data-notification-list]');
    if (notificationList && persona.notifications) {
      notificationList.innerHTML = '';
      persona.notifications.forEach(n => {
        const item = document.createElement('div');
        item.className = `notification notification-${n.type}`;
        item.innerHTML = `
          <div class="notification-text">${n.text}</div>
          <div class="notification-time">${n.time}</div>
        `;
        notificationList.appendChild(item);
      });
    }

    document.dispatchEvent(new CustomEvent('persona:applied', { detail: { name: personaName, data: persona } }));
  }

  window.Data = { all: DATA, personas: DATA.personas, get: getPersona, apply, formatCurrency, formatNumber };
})();
