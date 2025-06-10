// TODO: Get locale from device
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
}