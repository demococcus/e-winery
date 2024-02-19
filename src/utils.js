
function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentVintage() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1 to get the current month number

  // Check if the current month is in the second half of the year (July - December)
  if (currentMonth >= 7 && currentMonth <= 12) {
    return currentDate.getFullYear(); // Return the current year
  } else {      
    return currentDate.getFullYear() - 1;
  }
}

function getDateDaysAgo(days) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export { getCurrentDate, getDateDaysAgo, getCurrentVintage }