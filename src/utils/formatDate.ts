export const formatDate = (date: Date, day?: boolean): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    ...day && { day: '2-digit' },
    month: '2-digit',
    year: 'numeric'
  }
  return new Date(date).toLocaleDateString('en-US', options)
}