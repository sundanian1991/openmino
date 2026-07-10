/**
 * 调用 CloudBase 混元生图 API 生成电视机海报
 * 用法：node generate-image.js
 */

const cloudbase = require('@cloudbase/node-sdk')

const ENV_ID = 'myagent-d5gj5bknec2cdbe3f'

async function main() {
  const app = cloudbase.init({ env: ENV_ID })
  const ai = app.ai()

  const prompt = '一张现代超薄电视机产品海报，白色背景，极简设计风格，电视机屏幕显示美丽的4K自然风景画面，屏幕发出柔和蓝光，产品放在干净的白色展示台上，左侧有"4K HDR"和"AI画质引擎"的简洁文字标签，科技感，高端，商业摄影风格，高质量'

  console.log('正在生成图片...')
  console.log('Prompt:', prompt)
  console.log('')

  try {
    const imageModel = ai.createImageModel('hunyuan-image')

    // 使用新模型 HY-Image-3.0-Plus-4090-Tob-v1.0
    imageModel.generateImageSubUrlConfig = imageModel.generateImageSubUrlConfig || {}
    imageModel.generateImageSubUrlConfig['hunyuan-image'] = imageModel.generateImageSubUrlConfig['hunyuan-image'] || {}
    imageModel.generateImageSubUrlConfig['hunyuan-image']['HY-Image-3.0-Plus-4090-Tob-v1.0'] = 'images/ar/generations'

    const res = await imageModel.generateImage({
      model: 'HY-Image-3.0-Plus-4090-Tob-v1.0',
      prompt,
      size: '1280x720',
      revise: { value: true },
    })

    console.log('生成成功！')
    console.log('图片 URL（24小时有效）:', res.data[0].url)
    console.log('改写后的 Prompt:', res.data[0].revised_prompt)
    console.log('')
    console.log('提示：URL 24小时后失效，建议立即保存图片到本地')

    return res.data[0].url
  } catch (err) {
    console.error('生成失败:', err.message)
    if (err.code) console.error('错误码:', err.code)
    throw err
  }
}

main().catch(console.error)
