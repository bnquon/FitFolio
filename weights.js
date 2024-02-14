const addressUser = sessionStorage.getItem('username');
document.getElementById('username').textContent = addressUser;
document.getElementById('username').style.fontWeight = '700';

   
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function generateCalendar() {
    const table = document.getElementById("calendar");

    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    console.log(month);
    console.log(year);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayAbbreviation = firstDay.toLocaleString('en-US', { weekday: 'short' });

    let numDay = daysInMonth(month, year);
    console.log(numDay);

}

generateCalendar();

// Get first day abbreviation, match it with column header start the count until num day is ended