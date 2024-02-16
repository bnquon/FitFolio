const storedUserID = sessionStorage.getItem('userid');
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
        sessionStorage.setItem("exerciseList", JSON.stringify(data.exerciseList));
        // Do something with the data, such as displaying it on the page
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching exercise data:', error);
    });
}

viewExercise();

function addExerciseRow(exercises) {
    var table = document.getElementById("exerciseTable");
    let newRow = table.insertRow(-1);
    for (let i = 0; i < 3; i++) {
        var cell = newRow.insertCell(i);
        
        switch (i) {
            case 0:
                var select = document.createElement("select");

                // Populate the select element with options based on exercises
                exercises.forEach(exercise => {
                    var option = document.createElement("option");
                    option.value = exercise.id;  // Use the appropriate property from exercise
                    option.text = exercise.exerciseName;  // Use the appropriate property from exercise
                    select.add(option);
                });
                applyTemplateCellStyle(select);
                cell.appendChild(select);
                break;

            case 1:
            case 2:
                var input = document.createElement("input");
                input.type = "number";
                input.min = "1";
                applyTemplateCellStyle(input);
                cell.appendChild(input);
                break;
        }
    }
}

function applyTemplateCellStyle(cell) {
    cell.style.width = '100%';
    cell.style.textAlign = 'center';
    cell.style.padding = '4px';
}

const exerciseList = JSON.parse(sessionStorage.getItem("exerciseList"));

document.getElementById("addExercise").addEventListener("click", function() {
    addExerciseRow(exerciseList);
});

function applyGoalCellStyle(cell) {
    cell.style.fontFamily = 'Nunito Sans';
    cell.style.border = "none";
    cell.style.borderBottom = "1px solid #ccc";
    cell.style.fontSize = '16px';
    cell.style.padding = '3px';
    cell.style.marginTop = '15px';
    cell.style.marginLeft = '10px';
}

function addWeightGoal() {
    var goalContainer = document.getElementById("goalContentContainer");
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.placeholder = 'Enter goal...';
    applyGoalCellStyle(inputText);
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);
    li.appendChild(inputText);

    ul.appendChild(li);
    
    if (goalContainer.firstChild) {
        goalContainer.insertBefore(ul, goalContainer.firstChild);
    } else {
        goalContainer.appendChild(ul);
    }

    document.getElementById("GoalSave").addEventListener("click", function() {
        saveGoal(inputText.value, checkbox.checked);
    });

}

// NEED TO MAKE THIS HAPPEN ON SAVE BUTTON CLICK NOT AUTOMATICALLY
function saveGoal(goal, status) {
    fetch("http://127.0.0.1:3000/addWeightGoal", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            storedUserID,
            goal,
            status,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error! Status: ${response.status}");
        }
        return response.json();
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("HTTP error! Status: ${response.status}");
        }
        console.log("Goal added successfully: ", response);
    })
    .catch(error => {
        console.error("Save failed: ", error);
    });
}
