function calculateFutureDate(baseDate: Date, daysToAdd: number) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + daysToAdd);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Africa/Lagos', // Nigeria's time zone
    // timeZoneName: 'short',
  };

  return date.toLocaleString('en-US', options);
}

export { calculateFutureDate };
