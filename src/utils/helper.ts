function calculateFutureDate(daysToAdd: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Africa/Lagos', // Nigeria's time zone
    // timeZoneName: 'short',
  };

  return date.toLocaleString('en-US', options);
}

export { calculateFutureDate };
