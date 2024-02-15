const addressUser = sessionStorage.getItem('username');
document.getElementById('username').textContent = addressUser;
document.getElementById('username').style.fontWeight = '700';

   
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function generateCalendar() {
    const table = document.getElementById("calendar");
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    console.log(month);
    console.log(year);

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayAbbreviation = firstDay.toLocaleString('en-US', { weekday: 'short' });

    let numDay = daysInMonth(month, year);
    console.log(numDay);

    // Find the index of the first day
    let startIndex = daysOfWeek.indexOf(dayAbbreviation);

    for (let i = 0; i < 6; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell();
            calendarCellStyle(cell);
            if (i === 0 && j < startIndex) {
                cell.textContent = "";
            } else if (i*7 + j - startIndex + 1 <= numDay) {
                cell.textContent = i*7 + j - startIndex + 1;
            } else i++;
        }
    }
}
generateCalendar();

function calendarCellStyle(cell) {
    cell.style.fontSize = '20px';
    cell.style.height = '100px';
}

function viewExercise() {
    fetch("http://127.0.0.1:3000/selectExercise", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the data received from the server
        console.log("Exercise List:", data.exerciseList);
        sessionStorage.setItem("exerciseList", data.exerciseList);
        // Do something with the data, such as displaying it on the page
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching exercise data:', error);
    });
}

function addExerciseRow() {
    var table = document.getElementById("exerciseTable");
    let newRow = table.insertRow(1);

    for (let i = 0; i < 3; i++) {
        var cell = newRow.insertCell(i);
        var input = document.createElement("input");
        switch(i) {
            case 0:
                break;
            case 1:
                input.type = "number";
                break;
            case 2:
                input.type = "number";
                break;
        }
        input.style.width = '100%';
        cell.appendChild(input);
    }

}

document.getElementById("addExercise").addEventListener("click", addExerciseRow);