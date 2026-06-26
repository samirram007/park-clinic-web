export const formatMessageDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  if (isToday) {
    if (diffHour > 0) return `Today, ${diffHour}h ${diffMin % 60}m ago`
    if (diffMin > 0) return `Today, ${diffMin}m ago`
    return `Today, ${diffSec}s ago`
  }

  if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }

  return date.toLocaleDateString()
}
