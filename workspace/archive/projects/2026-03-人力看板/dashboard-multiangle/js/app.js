/**
 * 多角度可视化 - 应用主逻辑
 * 包含悬浮导航、文件上传、7个视角渲染
 */

const MultiAngleApp = {
  state: {
    currentData: null,
    currentSection: 'v1',
    isScrolling: false
  },

  /**
   * 初始化应用
   */
  async init() {
    console.log('🚀 多角度可视化初始化中...');
    
    try {
      // 加载默认数据
      this.state.currentData = this.getMockData();
      
      // 初始化悬浮导航
      this.initFloatingNav();
      
      // 初始化文件上传
      this.initFileUpload();
      
      // 渲染所有图表
      this.renderAll();
      
      // 绑定滚动事件
      this.bindScrollEvents();
      
      console.log('✅ 多角度可视化初始化完成');
    } catch (error) {
      console.error('❌ 初始化失败:', error);
    }
  },

  /**
   * 初始化悬浮导航
   */
  initFloatingNav() {
    const navItems = document.querySelectorAll('.float-nav-item');
    const sections = document.querySelectorAll('.section');
    
    // 点击导航平滑滚动
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          this.state.isScrolling = true;
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // 更新激活状态
          navItems.forEach(n => n.classList.remove('active'));
          item.classList.add('active');
          
          setTimeout(() => {
            this.state.isScrolling = false;
          }, 800);
        }
      });
    });
    
    // 滚动时更新当前激活项
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (this.state.isScrolling) return;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
              item.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  },

  /**
   * 初始化文件上传
   */
  initFileUpload() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    
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
    
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.loadFromFile(e.target.files[0]);
        }
      });
    }
  },

  /**
   * 从文件加载数据
   */
  async loadFromFile(file) {
    try {
      const data = await dataLoader.loadExcel(file);
      this.state.currentData = data;
      this.renderAll();
      this.showMessage('数据加载成功！');
      
      // 更新最后更新时间
      const updateEl = document.getElementById('last-update');
      if (updateEl) {
        updateEl.textContent = new Date().toLocaleString('zh-CN');
      }
    } catch (error) {
      this.showError('文件读取失败: ' + error.message);
    }
  },

  /**
   * 渲染所有视角
   */
  renderAll() {
    const data = this.state.currentData;
    if (!data) return;
    
    this.updateKPIs(data);
    
    // V1: 规模全景
    MultiAngleCharts.v1Trend(data, 'v1-trend');
    MultiAngleCharts.v1SupplierPie(data, 'v1-supplier');
    MultiAngleCharts.v1ProductBar(data, 'v1-product');
    
    // V2: 时间演化
    MultiAngleCharts.v2Heatmap(data, 'v2-heatmap');
    MultiAngleCharts.v2MonthlyBar(data, 'v2-monthly');
    
    // V3: 地域洞察
    MultiAngleCharts.v3ProvinceBar(data, 'v3-province');
    MultiAngleCharts.v3WorkplaceScatter(data, 'v3-scatter');
    
    // V4: 供应商画像
    MultiAngleCharts.v4SupplierMatrix(data, 'v4-matrix');
    MultiAngleCharts.v4Sankey(data, 'v4-sankey');
    
    // V5: 业态透视
    MultiAngleCharts.v5ProductTrend(data, 'v5-trend');
    MultiAngleCharts.v5ProductRadar(data, 'v5-radar');
    
    // V6: 职场深度
    MultiAngleCharts.v6WorkplaceHeatmap(data, 'v6-heatmap');
    MultiAngleCharts.v6WorkplaceBar(data, 'v6-bar');
    
    // V7: 风险洞察
    MultiAngleCharts.v7RiskGauge(data, 'v7-risk');
    MultiAngleCharts.v7VolatilityLine(data, 'v7-volatility');
    
    // 生成洞察
    this.generateInsights(data);
  },

  /**
   * 更新 KPI 卡片
   */
  updateKPIs(data) {
    const monthlyValues = Object.values(data.monthly || {});
    const total = monthlyValues.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / 12);
    const max = Math.max(...monthlyValues);
    const min = Math.min(...monthlyValues.filter(v => v > 0));
    
    this.setText('kpi-total', avg.toLocaleString());
    this.setText('kpi-suppliers', Object.keys(data.suppliers || {}).length.toString());
    this.setText('kpi-workplaces', Object.keys(data.workplaces || {}).length.toString());
    this.setText('kpi-max', max.toLocaleString());
    this.setText('kpi-min', min.toLocaleString());
  },

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  /**
   * 生成洞察
   */
  generateInsights(data) {
    const insights = [];
    const monthlyValues = Object.values(data.monthly || {});
    const months = Object.keys(data.monthly || {});
    
    // 找出最大波动
    let maxChange = 0;
    let maxChangeMonth = '';
    for (let i = 1; i < monthlyValues.length; i++) {
      const change = Math.abs(monthlyValues[i] - monthlyValues[i - 1]);
      if (change > maxChange) {
        maxChange = change;
        maxChangeMonth = months[i];
      }
    }
    
    if (maxChange > 0) {
      insights.push({
        icon: '📈',
        title: '最大月度波动',
        desc: `${maxChangeMonth}人力波动最大，环比变化 ${maxChange}人，建议关注业务需求变化`
      });
    }
    
    // 头部供应商集中度
    const suppliers = Object.entries(data.suppliers || {}).sort((a, b) => b[1] - a[1]);
    if (suppliers.length > 0) {
      const top3Share = suppliers.slice(0, 3).reduce((sum, s) => sum + s[1], 0) / suppliers.reduce((sum, s) => sum + s[1], 0) * 100;
      insights.push({
        icon: '🏢',
        title: '供应商集中度',
        desc: `TOP3 供应商占比 ${top3Share.toFixed(1)}%，${top3Share > 60 ? '集中度较高，建议分散风险' : '分布较为均衡'}`
      });
    }
    
    // 峰值分析
    const maxMonth = months[monthlyValues.indexOf(Math.max(...monthlyValues))];
    insights.push({
      icon: '⛰️',
      title: '年度峰值',
      desc: `${maxMonth}达到年度峰值，可能与业务旺季或项目启动相关`
    });
    
    // 渲染洞察
    const container = document.getElementById('insight-cards');
    if (container) {
      container.innerHTML = insights.map(i => `
        <div class="insight-card">
          <div class="insight-icon">${i.icon}</div>
          <div class="insight-title">${i.title}</div>
          <div class="insight-desc">${i.desc}</div>
        </div>
      `).join('');
    }
  },

  /**
   * 绑定滚动事件
   */
  bindScrollEvents() {
    window.addEventListener('resize', () => {
      MultiAngleCharts.resizeAll();
    });
  },

  /**
   * 显示消息
   */
  showMessage(msg) {
    console.log('📢', msg);
  },

  /**
   * 显示错误
   */
  showError(msg) {
    console.error('❌', msg);
    alert(msg);
  },

  /**
   * 模拟数据
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
        '陕西海腾信息科技有限公司': 6715, '河北创博信息技术有限公司': 5607,
        '合肥毅航通信技术有限公司': 4854, '汇讯（湖北）商务信息咨询有限公司': 3509,
        '河北锦瑞信息科技有限公司': 2959, '中乾（深圳）投资控股有限公司': 2686,
        '河北秦冀德辰科技有限公司': 2337, '毛毛虫（昆山）商务咨询有限公司': 2043,
        '北京中弘智享科技有限公司': 1966, '北京速讯达科技有限公司': 1738
      },
      workplaces: {
        '含光路职场': 4781, '通达花园职场': 2437, '安定东职场': 2337,
        '正定职场': 2263, '创博职场': 1994, '信安大厦职场': 1437,
        '蜀山职场': 1419, '依立腾职场': 1334, '承德职场': 1294
      },
      provinces: {
        '陕西': 8500, '河北': 7200, '安徽': 6500, '湖北': 4800,
        '北京': 4200, '四川': 2800, '江苏': 2200
      },
      products: {
        '金条': 8000, '企业金融': 6000, '信用卡': 5000, '财富': 4000
      },
      details: []
    };
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  MultiAngleApp.init();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MultiAngleApp };
}
