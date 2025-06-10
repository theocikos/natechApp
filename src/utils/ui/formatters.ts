// TODO: Get locale from device
export function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
}

export function formatIBAN(value: string): string {
  if (!value) return '';
  const cleaned = value.replace(/\s/g, '').toUpperCase();
  const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
}