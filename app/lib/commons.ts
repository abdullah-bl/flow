


export const formatMoney = (amount: number) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'SAR',
}).format(amount);



export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(date));