const originalWarn = console.warn.bind(console)

console.warn = (...args) => {
  const message = args.map((item) => {
    if (typeof item === 'string') return item
    if (item instanceof Error) return item.message
    return ''
  }).join(' ')

  if (message.includes('Stack guards not supported')) return
  originalWarn(...args)
}
