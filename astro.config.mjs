import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightThemeBlack from 'starlight-theme-black'
import mermaidCodeBlocks from './src/mermaid/rehype-mermaid.mjs'

function minimalMermaid() {
  return {
    name: 'minimal-mermaid',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript(
          'page',
          `
import mermaid from 'mermaid'

// In-house theme palettes. Mirror shared/src/theme/presets.ts token HSL
// triplets; rendered as hsl() strings so they stay in sync with the CSS vars.
const themes = {
  'minimal-dark': {
    background: 'hsl(0 0% 9%)',
    mainBkg: 'hsl(0 0% 12%)',
    secondBkg: 'hsl(0 0% 15%)',
    tertiaryBkg: 'hsl(0 0% 9%)',
    primaryColor: 'hsl(0 0% 12%)',
    primaryTextColor: 'hsl(0 0% 95%)',
    primaryBorderColor: 'hsl(0 0% 70%)',
    secondaryColor: 'hsl(0 0% 15%)',
    secondaryTextColor: 'hsl(0 0% 95%)',
    secondaryBorderColor: 'hsl(0 0% 65%)',
    tertiaryColor: 'hsl(0 0% 9%)',
    tertiaryTextColor: 'hsl(0 0% 95%)',
    tertiaryBorderColor: 'hsl(0 0% 42%)',
    lineColor: 'hsl(0 0% 70%)',
    textColor: 'hsl(0 0% 95%)',
    fontFamily: 'var(--sl-font-system)',
    clusterBkg: 'hsl(0 0% 9%)',
    clusterBorder: 'hsl(0 0% 25%)',
    edgeLabelBackground: 'hsl(0 0% 9%)',
    nodeBorder: 'hsl(0 0% 70%)',
    actorBkg: 'hsl(0 0% 12%)',
    actorBorder: 'hsl(0 0% 70%)',
    actorTextColor: 'hsl(0 0% 95%)',
    labelBoxBkgColor: 'hsl(0 0% 12%)',
    labelBoxBorderColor: 'hsl(0 0% 70%)',
    labelTextColor: 'hsl(0 0% 95%)',
    loopTextColor: 'hsl(0 0% 95%)',
    noteBkgColor: 'hsl(0 0% 15%)',
    noteTextColor: 'hsl(0 0% 95%)',
    noteBorderColor: 'hsl(0 0% 70%)',
    activationBkgColor: 'hsl(0 0% 15%)',
    activationBorderColor: 'hsl(0 0% 70%)',
    sequenceNumberColor: 'hsl(0 0% 9%)',
  },
  'minimal-paper': {
    background: 'hsl(51 33% 92%)',
    mainBkg: 'hsl(48 100% 97%)',
    secondBkg: 'hsl(51 21% 88%)',
    tertiaryBkg: 'hsl(51 33% 92%)',
    primaryColor: 'hsl(48 100% 97%)',
    primaryTextColor: 'hsl(0 3% 6%)',
    primaryBorderColor: 'hsl(0 3% 6%)',
    secondaryColor: 'hsl(51 21% 88%)',
    secondaryTextColor: 'hsl(0 3% 6%)',
    secondaryBorderColor: 'hsl(45 2% 33%)',
    tertiaryColor: 'hsl(51 33% 92%)',
    tertiaryTextColor: 'hsl(0 3% 6%)',
    tertiaryBorderColor: 'hsl(55 10% 79%)',
    lineColor: 'hsl(0 3% 6%)',
    textColor: 'hsl(0 3% 6%)',
    fontFamily: 'var(--sl-font-system)',
    clusterBkg: 'hsl(48 100% 97%)',
    clusterBorder: 'hsl(55 10% 79%)',
    edgeLabelBackground: 'hsl(51 33% 92%)',
    nodeBorder: 'hsl(0 3% 6%)',
    actorBkg: 'hsl(48 100% 97%)',
    actorBorder: 'hsl(0 3% 6%)',
    actorTextColor: 'hsl(0 3% 6%)',
    labelBoxBkgColor: 'hsl(48 100% 97%)',
    labelBoxBorderColor: 'hsl(0 3% 6%)',
    labelTextColor: 'hsl(0 3% 6%)',
    loopTextColor: 'hsl(0 3% 6%)',
    noteBkgColor: 'hsl(51 21% 88%)',
    noteTextColor: 'hsl(0 3% 6%)',
    noteBorderColor: 'hsl(0 3% 6%)',
    activationBkgColor: 'hsl(51 21% 88%)',
    activationBorderColor: 'hsl(0 3% 6%)',
    sequenceNumberColor: 'hsl(51 33% 92%)',
  },
}

function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? themes['minimal-paper'] : themes['minimal-dark']
}

function mountMermaidCanvas(diagram) {
  const svg = diagram.querySelector('svg')
  if (!svg) return

  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.style.transformOrigin = '0 0'

  let scale = 1
  let x = 0
  let y = 0
  let dragging = false
  let lastX = 0
  let lastY = 0

  function paint() {
    svg.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')'
  }

  function reset() {
    scale = 1
    x = 0
    y = 0
    paint()
  }

  diagram.addEventListener('wheel', (event) => {
    event.preventDefault()
    const rect = diagram.getBoundingClientRect()
    const cursorX = event.clientX - rect.left
    const cursorY = event.clientY - rect.top

    const factor = event.deltaY < 0 ? 1.08 : 0.92
    const nextScale = Math.min(4, Math.max(0.4, scale * factor))
    if (nextScale === scale) return

    const worldX = (cursorX - x) / scale
    const worldY = (cursorY - y) / scale
    scale = nextScale
    x = cursorX - worldX * scale
    y = cursorY - worldY * scale
    paint()
  }, { passive: false })

  diagram.addEventListener('pointerdown', (event) => {
    dragging = true
    lastX = event.clientX
    lastY = event.clientY
    diagram.setPointerCapture(event.pointerId)
    diagram.classList.add('is-dragging')
  })

  diagram.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY
    lastX = event.clientX
    lastY = event.clientY
    x += dx
    y += dy
    paint()
  })

  function stopDragging(event) {
    if (!dragging) return
    dragging = false
    diagram.classList.remove('is-dragging')
    if (event) diagram.releasePointerCapture(event.pointerId)
  }

  diagram.addEventListener('pointerup', stopDragging)
  diagram.addEventListener('pointercancel', stopDragging)
  diagram.addEventListener('dblclick', reset)

  paint()
}

async function renderMermaid() {
  const diagrams = [...document.querySelectorAll('.mermaid')]
  if (diagrams.length === 0) return

  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    suppressErrorRendering: true,
    themeVariables: currentTheme(),
  })

  for (const [index, diagram] of diagrams.entries()) {
    const source = diagram.dataset.source || diagram.textContent.trim()
    if (!source) continue

    diagram.dataset.source = source
    diagram.removeAttribute('data-processed')

    try {
      const id = 'glib-mermaid-' + index + '-' + Date.now().toString(36)
      const { svg } = await mermaid.render(id, source)
      diagram.innerHTML = svg
      mountMermaidCanvas(diagram)
    } catch (error) {
      console.error('Mermaid render failed', { source, error })
      diagram.textContent = source
    }
  }
}

let queued = false
function queueRender() {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    renderMermaid()
  })
}

document.addEventListener('DOMContentLoaded', queueRender)
new MutationObserver((mutations) => {
  if (mutations.some((mutation) => mutation.attributeName === 'data-theme')) queueRender()
}).observe(document.documentElement, { attributes: true })
          `
        )
      },
    },
  }
}

export default defineConfig({
  site: 'https://glibcode.com',
  markdown: {
    rehypePlugins: [mermaidCodeBlocks],
  },
  integrations: [
    minimalMermaid(),
    starlight({
      title: 'glib-code',
      logo: {
        light: './glib-docs-appp-logo.png',
        dark: './glib-docs-appp-logo.png',
        alt: 'glib-code',
        replacesTitle: true,
      },
      favicon: '/glib-single-g.png',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/cloudboy-jh/glib-code' },
      ],
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
      },
      plugins: [
        starlightThemeBlack({
          footerText: '',
        }),
      ],
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Why glib-code', link: '/why/' },
        { label: 'Getting Started', link: '/getting-started/' },
        {
          label: 'Concepts',
          items: [
            { label: 'Review-first loop', link: '/concepts/review-first/' },
            { label: 'Sessions', link: '/concepts/sessions/' },
            { label: 'Promote', link: '/concepts/promote/' },
            { label: 'Provider/model authority', link: '/concepts/providers/' },
            { label: 'Sandbox', link: '/concepts/sandbox/' },
          ],
        },
        {
          label: 'Surfaces',
          items: [
            { label: 'Self-host', link: '/surfaces/self-host/' },
            { label: 'Server', link: '/surfaces/server/' },
            { label: 'Desktop', link: '/surfaces/desktop/' },
            { label: 'Hosted', link: '/surfaces/hosted/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Readiness & Health', link: '/api/readiness/' },
            { label: 'Auth', link: '/api/auth/' },
            { label: 'Providers', link: '/api/providers/' },
            { label: 'Projects', link: '/api/projects/' },
            { label: 'Repo', link: '/api/repo/' },
            { label: 'Agent', link: '/api/agent/' },
            { label: 'Sessions', link: '/api/sessions/' },
            { label: 'Diff', link: '/api/diff/' },
            { label: 'Git', link: '/api/git/' },
            { label: 'FS', link: '/api/fs/' },
            { label: 'Settings', link: '/api/settings/' },
            { label: 'Keybindings', link: '/api/keybindings/' },
            { label: 'Attachments', link: '/api/attachments/' },
            { label: 'Terminal', link: '/api/terminal/' },
            { label: 'Open in Editor', link: '/api/open-in-editor/' },
            { label: 'Internal', link: '/api/internal/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Run locally', link: '/guides/run-locally/' },
            { label: 'GitTrix integration', link: '/guides/gittrix-integration/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'In-House Themes', link: '/reference/in-house-themes/' },
          ],
        },
      ],
    }),
  ],
})
