export const formatTimeAgo = (timestamp) => {
  const timeDifference = Date.now() - timestamp;
  
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hrs ago`;
  if (minutes > 0) return `${minutes} mins ago`;
  
  return `${seconds} secs ago`;
}


export const getMessagesEn = () => {
    return {
        allDay: 'All Day',
        previous: '<',
        next: '>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        agenda: 'Agenda',
        date: 'Date',
        time: 'Time',
        event: 'Event',
        noEventsInRange: 'No events in this range',
        showMore: total => `+ Show more (${total})`
    };
};


export const capitalizeInitials = (name) => {
  const words = name.split(' ');
  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return '';
  });
  return capitalizedWords.join(' ');
};



export const getInitials = (str) =>  {
  let words = str.split(' ').slice(1);
  let initials = words.map(word => word.charAt(0).toUpperCase());
  return initials.join('');
}

export const getDateIsoString = (date) => {
  return new Date(date).toISOString();
}