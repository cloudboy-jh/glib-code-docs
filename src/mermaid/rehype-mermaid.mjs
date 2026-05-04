function textContent(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value || ''
  if (!Array.isArray(node.children)) return ''
  return node.children.map(textContent).join('')
}

function isMermaidCodeBlock(node) {
  if (node?.type !== 'element' || node.tagName !== 'pre') return false
  const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code')
  const className = code?.properties?.className || []
  return Array.isArray(className) && className.includes('language-mermaid')
}

function transform(node) {
  if (!node || !Array.isArray(node.children)) return

  node.children = node.children.map((child) => {
    if (isMermaidCodeBlock(child)) {
      const code = child.children.find((item) => item.type === 'element' && item.tagName === 'code')
      return {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'] },
        children: [{ type: 'text', value: textContent(code).trim() }],
      }
    }

    transform(child)
    return child
  })
}

export default function mermaidCodeBlocks() {
  return transform
}
