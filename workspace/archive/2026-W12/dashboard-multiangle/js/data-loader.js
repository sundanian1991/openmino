/**
 * 数据加载器 - 支持 Excel 文件读取
 * 使用 SheetJS (xlsx) 库解析 Excel
 */

class DataLoader {
  constructor() {
    this.rawData = null;
    this.processedData = null;
    this.columnMap = {};
  }

  /**
   * 加载 Excel 文件
   * @param {File|ArrayBuffer} file - 文件对象或 ArrayBuffer
   * @returns {Promise<Object>} 处理后的数据
   */
  async loadExcel(file) {
    try {
      // 确保 XLSX 库已加载
      if (typeof XLSX === 'undefined') {
        await this.loadXLSXLibrary();
      }

      let data;
      if (file instanceof File) {
        data = await file.arrayBuffer();
      } else {
        data = file;
      }

      const workbook = XLSX.read(data, { type: 'array' });
      
      // 获取第一个工作表
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // 转换为 JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length < 2) {
        throw new Error('Excel 文件数据不足（至少需要标题行和一行数据）');
      }

      this.rawData = jsonData;
      this.processedData = this.processData(jsonData);
      
      return this.processedData;
    } catch (error) {
      console.error('Excel 读取失败:', error);
      throw error;
    }
  }

  /**
   * 从 URL 加载 Excel（用于本地文件）
   * @param {string} url - 文件路径
   * @returns {Promise<Object>}
   */
  async loadFromURL(url) {
    try {
      if (typeof XLSX === 'undefined') {
        await this.loadXLSXLibrary();
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`无法加载文件: ${url}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      return await this.loadExcel(arrayBuffer);
    } catch (error) {
      console.error('从 URL 加载失败:', error);
      throw error;
    }
  }

  /**
   * 加载 SheetJS 库
   */
  loadXLSXLibrary() {
    return new Promise((resolve, reject) => {
      if (typeof XLSX !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('无法加载 SheetJS 库'));
      document.head.appendChild(script);
    });
  }

  /**
   * 处理原始数据
   * @param {Array} rawData - 原始二维数组
   * @returns {Object} 结构化数据
   */
  processData(rawData) {
    const headers = rawData[0].map(h => String(h).trim());
    const rows = rawData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''));
    
    // 自动识别列
    this.columnMap = this.identifyColumns(headers);
    
    // 解析每一行
    const records = rows.map((row, index) => this.parseRow(row, headers, index));
    
    // 聚合数据
    return this.aggregateData(records);
  }

  /**
   * 自动识别列名
   * @param {Array} headers - 表头数组
   * @returns {Object} 列名映射
   */
  identifyColumns(headers) {
    const map = {
      supplier: -1,
      workplace: -1,
      province: -1,
      productLine: -1,
      months: {} // 存储各个月份列的索引
    };

    headers.forEach((header, index) => {
      const lowerHeader = header.toLowerCase().trim();
      
      // 检查供应商列
      if (COLUMN_MAPPING.supplier.some(k => lowerHeader.includes(k.toLowerCase()))) {
        map.supplier = index;
      }
      // 检查站点列
      else if (COLUMN_MAPPING.workplace.some(k => lowerHeader.includes(k.toLowerCase()))) {
        map.workplace = index;
      }
      // 检查省份列
      else if (COLUMN_MAPPING.province.some(k => lowerHeader.includes(k.toLowerCase()))) {
        map.province = index;
      }
      // 检查产品线列
      else if (COLUMN_MAPPING.productLine.some(k => lowerHeader.includes(k.toLowerCase()))) {
        map.productLine = index;
      }
      // 检查月份列
      else {
        const monthMatch = header.match(COLUMN_MAPPING.monthPattern);
        if (monthMatch) {
          const monthNum = parseInt(monthMatch[1] || monthMatch[2]);
          if (monthNum >= 1 && monthNum <= 12) {
            map.months[monthNum] = index;
          }
        }
      }
    });

    console.log('列名识别结果:', map);
    return map;
  }

  /**
   * 解析单行数据
   */
  parseRow(row, headers, rowIndex) {
    const record = {
      supplier: '',
      workplace: '',
      province: '',
      productLine: '',
      monthlyData: {},
      raw: {}
    };

    // 提取已知字段
    if (this.columnMap.supplier >= 0) {
      record.supplier = String(row[this.columnMap.supplier] || '').trim();
    }
    if (this.columnMap.workplace >= 0) {
      record.workplace = String(row[this.columnMap.workplace] || '').trim();
    }
    if (this.columnMap.province >= 0) {
      record.province = String(row[this.columnMap.province] || '').trim();
    }
    if (this.columnMap.productLine >= 0) {
      record.productLine = String(row[this.columnMap.productLine] || '').trim();
    }

    // 提取月份数据
    Object.entries(this.columnMap.months).forEach(([month, colIndex]) => {
      const value = parseFloat(row[colIndex]) || 0;
      record.monthlyData[month] = value;
    });

    // 保存原始数据
    headers.forEach((header, idx) => {
      record.raw[header] = row[idx];
    });

    return record;
  }

  /**
   * 聚合数据为看板所需格式
   */
  aggregateData(records) {
    const result = {
      months: MONTHS,
      monthly: {},
      suppliers: {},
      workplaces: {},
      provinces: {},
      products: {},
      details: [],
      raw: records
    };

    // 初始化月度汇总
    MONTHS.forEach((m, i) => {
      result.monthly[m] = 0;
    });

    // 处理每条记录
    records.forEach(record => {
      if (!record.supplier && !record.workplace) return;

      // 汇总月度数据
      Object.entries(record.monthlyData).forEach(([month, count]) => {
        const monthName = MONTHS[parseInt(month) - 1];
        if (monthName) {
          result.monthly[monthName] = (result.monthly[monthName] || 0) + count;
        }
      });

      // 供应商汇总（取最大值或总和）
      if (record.supplier) {
        const total = Object.values(record.monthlyData).reduce((a, b) => a + b, 0);
        result.suppliers[record.supplier] = (result.suppliers[record.supplier] || 0) + total;
      }

      // 站点汇总
      if (record.workplace) {
        const total = Object.values(record.monthlyData).reduce((a, b) => a + b, 0);
        result.workplaces[record.workplace] = (result.workplaces[record.workplace] || 0) + total;
      }

      // 省份汇总
      if (record.province) {
        const total = Object.values(record.monthlyData).reduce((a, b) => a + b, 0);
        result.provinces[record.province] = (result.provinces[record.province] || 0) + total;
      }

      // 产品线汇总
      if (record.productLine) {
        const total = Object.values(record.monthlyData).reduce((a, b) => a + b, 0);
        result.products[record.productLine] = (result.products[record.productLine] || 0) + total;
      }

      // 保存明细
      result.details.push(record);
    });

    return result;
  }

  /**
   * 获取处理后的数据
   */
  getData() {
    return this.processedData;
  }

  /**
   * 获取列名映射（用于调试）
   */
  getColumnMap() {
    return this.columnMap;
  }
}

// 创建全局实例
const dataLoader = new DataLoader();

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataLoader, dataLoader };
}
