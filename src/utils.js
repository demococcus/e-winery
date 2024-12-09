
function getCurrentDateShort() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentDate(iso=true) {
  const currentDate = new Date();
  return iso ? currentDate.toISOString() : currentDate;
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

function getFirstDayOfCurrentMonth(iso=true) {
  const currentDate = new Date();
  const dateF = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  return iso ? dateF.toISOString() : dateF ;
}


function hasDuplicates(array) {
  const frequencyMap = {};

  for (const element of array) {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  }

  for (const key in frequencyMap) {
    if (frequencyMap[key] > 1) {
      return true; // If any element occurs more than once, return true
    }
  }

  return false;
}


export { 
  getCurrentDate, 
  getCurrentDateShort,
  getDateDaysAgo, 
  getFirstDayOfCurrentMonth,
  getCurrentVintage, 
  hasDuplicates,

}