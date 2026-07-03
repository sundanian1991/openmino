import { chromium } from 'playwright'

const url = 'http://localhost:4173/'
const browser = await chromium.launch({ headless: true })

async function checkPage(context, name) {
  const page = await context.newPage()
  const consoleMessages = []
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() })
  })
  page.on('pageerror', err => {
    consoleMessages.push({ type: 'pageerror', text: err.message })
  })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // Wait for images to decode
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('img')).every(img => img.complete && img.naturalWidth > 0)
  }, null, { timeout: 5000 }).catch(() => {})

  const info = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'))
    const sections = Array.from(document.querySelectorAll('section'))
    const tocNav = document.querySelector('nav, [data-testid="toc"], .toc, aside')
    const header = document.querySelector('header, .hero, [data-testid="hero"]')
    const heroSection = sections.find(s => s.querySelector('h1'))
    const heroEl = header || heroSection || document.body.firstElementChild
    const heroStyle = window.getComputedStyle(heroEl)
    const coverImg = heroEl?.querySelector('img')
    const allSection02 = sections.filter(s => /02/.test(s.textContent || ''))
    const allSection07 = sections.filter(s => /07/.test(s.textContent || ''))
    const section02 = allSection02[0]
    const section07 = allSection07[0]

    return {
      title: document.title,
      imgCount: imgs.length,
      imgs: imgs.map((img, i) => ({
        index: i,
        src: img.src.startsWith('data:') ? '[data-url/base64]' : img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        complete: img.complete,
        renderedWidth: Math.round(img.getBoundingClientRect().width),
        renderedHeight: Math.round(img.getBoundingClientRect().height),
        isInViewport: img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0
      })),
      sectionCount: sections.length,
      sectionTitles: sections.map((s, i) => ({ index: i, title: s.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 80) })),
      hasToc: !!tocNav && tocNav.textContent.length > 10,
      hasHero: !!header || !!heroSection,
      heroTag: heroEl?.tagName,
      heroBackground: heroStyle.backgroundImage,
      heroBackgroundSize: heroStyle.backgroundSize,
      heroHasCoverImg: !!coverImg,
      heroText: heroEl?.textContent?.trim().slice(0, 200),
      section02: {
        imgCount: section02?.querySelectorAll('img').length ?? 0,
        title: section02?.querySelector('h2, h3')?.textContent?.trim().slice(0, 80)
      },
      section07: {
        imgCount: section07?.querySelectorAll('img').length ?? 0,
        title: section07?.querySelector('h2, h3')?.textContent?.trim().slice(0, 80)
      },
      bodyScrollWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth
    }
  })

  await page.screenshot({ path: `/tmp/press-${name}.png`, fullPage: name === 'desktop' })
  await page.close()
  return { consoleMessages, info }
}

const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
const desktop = await checkPage(desktopContext, 'desktop')

const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 })
const mobile = await checkPage(mobileContext, 'mobile')

await browser.close()

console.log(JSON.stringify({ desktop, mobile }, null, 2))
