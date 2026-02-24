// 风格类型定义

export interface Style {
  id: string;
  name: string;
  type: string;
  keywords: string[];
  primaryColors: ColorInfo[];
  secondaryColors: ColorInfo[];
  effects: string;
  bestFor: string[];
  doNotUseFor: string[];
  lightMode: string;
  darkMode: string;
  performance: string;
  accessibility: string;
  mobileFriendly: string;
  conversionFocused: string;
  frameworkCompatibility: string;
  era: string;
  complexity: string;
  aiPromptKeywords: string;
  cssKeywords: string;
  implementationChecklist: string;
  designVariables: string;
}

export interface ColorInfo {
  name?: string;
  hex: string;
}
