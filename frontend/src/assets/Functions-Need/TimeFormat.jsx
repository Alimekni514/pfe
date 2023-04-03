//time function 
const timefunction=(dateString)=> {
    const date = new Date(dateString);
    
    // Get month name and day of the month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const dayOfMonth = date.getDate();
    
    // Get suffix for day of the month (st, nd, rd, or th)
    let suffix;
    switch (dayOfMonth % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
    
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      suffix = 'th';
    }
    // Get hour, minute, and AM/PM
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    if (hour > 12) {
      hour -= 12;
    }
    // Format the date string in the desired format
    const formattedDateString = `${month} ${dayOfMonth}${suffix}, ${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    console.log(formattedDateString);
    return formattedDateString
        }
        export {timefunction};