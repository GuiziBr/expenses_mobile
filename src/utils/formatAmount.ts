export const formatAmount = (valueInCents: number = 0): string => Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format(valueInCents / 100)

export const unformatAmount = (formattedValue: string): number => Number(formattedValue.replace(/[,]/ig, ''))

export const formatCurrency = ((value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1.$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ',')
  return value
})
