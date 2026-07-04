/**
 * Форматирует число в денежный вид по ТЗ (две цифры после запятой и знак $)
 * Пример: 5000 -> "5,000.00 $"
 */

export function formatCurrency(value) {
    const num = Number(value) || 0;
    // Опция minimumFractionDigits: 2 принудительно оставляет .00, даже если число целое
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        minimumFractionDigits: 2
    }) + ' $';
}
