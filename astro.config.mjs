import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightThemeBlack from 'starlight-theme-black'
import mermaidCodeBlocks from './src/mermaid/rehype-mermaid.mjs'

function catppuccinMermaid() {
  return {
    name: 'catppuccin-mermaid',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript(
          'page',
          `
import mermaid from 'mermaid'

const themes = {
  mocha: {
    background: '#1e1e2e',
    mainBkg: '#313244',
    secondBkg: '#45475a',
    tertiaryBkg: '#181825',
    primaryColor: '#313244',
    primaryTextColor: '#cdd6f4',
    primaryBorderColor: '#cba6f7',
    secondaryColor: '#45475a',
    secondaryTextColor: '#cdd6f4',
    secondaryBorderColor: '#89b4fa',
    tertiaryColor: '#181825',
    tertiaryTextColor: '#cdd6f4',
    tertiaryBorderColor: '#f5c2e7',
    lineColor: '#cba6f7',
    textColor: '#cdd6f4',
    fontFamily: 'var(--sl-font-system)',
    clusterBkg: '#181825',
    clusterBorder: '#585b70',
    edgeLabelBackground: '#1e1e2e',
    nodeBorder: '#cba6f7',
    actorBkg: '#313244',
    actorBorder: '#cba6f7',
    actorTextColor: '#cdd6f4',
    labelBoxBkgColor: '#313244',
    labelBoxBorderColor: '#cba6f7',
    labelTextColor: '#cdd6f4',
    loopTextColor: '#cdd6f4',
    noteBkgColor: '#f9e2af',
    noteTextColor: '#11111b',
    noteBorderColor: '#fab387',
    activationBkgColor: '#45475a',
    activationBorderColor: '#cba6f7',
    sequenceNumberColor: '#1e1e2e',
  },
  latte: {
    background: '#eff1f5',
    mainBkg: '#e6e9ef',
    secondBkg: '#dce0e8',
    tertiaryBkg: '#ccd0da',
    primaryColor: '#e6e9ef',
    primaryTextColor: '#4c4f69',
    primaryBorderColor: '#8839ef',
    secondaryColor: '#dce0e8',
    secondaryTextColor: '#4c4f69',
    secondaryBorderColor: '#1e66f5',
    tertiaryColor: '#ccd0da',
    tertiaryTextColor: '#4c4f69',
    tertiaryBorderColor: '#ea76cb',
    lineColor: '#8839ef',
    textColor: '#4c4f69',
    fontFamily: 'var(--sl-font-system)',
    clusterBkg: '#e6e9ef',
    clusterBorder: '#9ca0b0',
    edgeLabelBackground: '#eff1f5',
    nodeBorder: '#8839ef',
    actorBkg: '#e6e9ef',
    actorBorder: '#8839ef',
    actorTextColor: '#4c4f69',
    labelBoxBkgColor: '#e6e9ef',
    labelBoxBorderColor: '#8839ef',
    labelTextColor: '#4c4f69',
    loopTextColor: '#4c4f69',
    noteBkgColor: '#df8e1d',
    noteTextColor: '#eff1f5',
    noteBorderColor: '#fe640b',
    activationBkgColor: '#dce0e8',
    activationBorderColor: '#8839ef',
    sequenceNumberColor: '#eff1f5',
  },
}

function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? themes.latte : themes.mocha
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
    catppuccinMermaid(),
    starlight({
      title: 'glib-code',
      logo: {
        light: './glib-docs-logo.png',
        dark: './glib-docs-logo.png',
        alt: 'glib-code',
        replacesTitle: true,
      },
      favicon: '/glib-single-g.png',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/cloudboy-jh/glib-code' },
      ],
      expressiveCode: {
        themes: ['catppuccin-mocha', 'catppuccin-latte'],
      },
      plugins: [
        starlightThemeBlack({
          footerText: '',
        }),
      ],
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Why glib-code', link: '/why/' },
        { label: 'Getting Started', link: '/guides/getting-started/' },
        {
          label: 'Concepts',
          items: [
            { label: 'Review-first loop', link: '/concepts/review-first/' },
            { label: 'Sessions', link: '/concepts/sessions/' },
            { label: 'Promote', link: '/concepts/promote/' },
            { label: 'Provider/model authority', link: '/concepts/providers/' },
            { label: 'GitTrix isolation', link: '/concepts/gittrix/' },
          ],
        },
        {
          label: 'Surfaces',
          items: [
            { label: 'Web', link: '/surfaces/web/' },
            { label: 'Server', link: '/surfaces/server/' },
            { label: 'Desktop', link: '/surfaces/desktop/' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Providers', link: '/api/providers/' },
            { label: 'Agent', link: '/api/agent/' },
            { label: 'Sessions', link: '/api/sessions/' },
            { label: 'Diff', link: '/api/diff/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Run locally', link: '/guides/run-locally/' },
            { label: 'GitTrix integration', link: '/guides/gittrix-integration/' },
          ],
        },
      ],
    }),
  ],
})
