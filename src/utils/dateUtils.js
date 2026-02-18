export const getRamadanDates = (year = 2026) => {
  const ramadanStart = new Date(year, 1, 18);
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(ramadanStart);
    date.setDate(date.getDate() + i);
    return {
      day: i + 1,
      date: date.toISOString().split('T')[0],
      formatted: date.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  });
};

export const getBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};
