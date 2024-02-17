const storedUserID = sessionStorage.getItem('userid');
const addressUser = sessionStorage.getItem('username');
document.getElementById('username').textContent = addressUser;
document.getElementById('username').style.fontWeight = '700';

document.getElementById('templateName').placeholder = "Enter Template Name";

fetch(`http://127.0.0.1:3000/retrieveWeightliftingData?passedUserID=${storedUserID}`, {
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
    console.log(data);
    // populateTable(data.templateData);
    populateGoals(data.weightliftingGoalData);
})
.catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
});

fetch(`http://127.0.0.1:3000/retrieveWorkoutTemplates?passedUserID=${storedUserID}`, {
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
    console.log("Workout Template Data: ", data.workoutTemplate);
    testing(data.workoutTemplate);
})
.catch(error => {
    console.error('Error fetching data: ', error);
});

// MAYBE RECURSIVE? PROBABLY
function testing(data, index) {
    // console.log(data[0].templateID);
    if (index >= data.length) {
        // End of the data array
        return;
    }
    
    const currentTemplateID = data[index].templateID;
    var values = [];

    //need to implement while loop checking if templateID is equal to one before

    console.log("TEMPLATE VALUES IS: ", values);

}

const gridContainer = document.getElementById('templates');

function addElementToGrid(content) {
   const newElement = document.createElement('div');
   newElement.classList.add('grid-item');
   newElement.textContent = content;

   gridContainer.appendChild(newElement);
}

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

function applyGoalCellStyle(cell) {
    cell.style.fontFamily = 'Nunito Sans';
    cell.style.border = "none";
    cell.style.borderBottom = "1px solid #ccc";
    cell.style.fontSize = '16px';
    cell.style.padding = '3px';
    cell.style.marginTop = '15px';
    cell.style.marginLeft = '10px';
}

function strikeThrough(text) {
    return text
        .split('')
        .map(char => char + '\u0336')
        .join('')
}

function populateGoals(data) {
    const goalContainer = document.getElementById("goalContentContainer");
    data.forEach(item => {  
        const values = Object.values(item).slice(1, -1);
        console.log("VALUES IS ", values);
        
        var ul = document.createElement('ul');
        ul.style.width = '100%';
        var li = document.createElement('li');
        
        const storedText = document.createElement('input');

        storedText.value = values[0];
        applyGoalCellStyle(storedText);
        
        var checkbox = document.createElement('input');
        
        checkbox.type = 'checkbox';
        if (values[1] === 1) {
            checkbox.checked = true;
            const crossedStoredText = strikeThrough(values[0]);
            storedText.value = crossedStoredText;
        }

        li.appendChild(checkbox);
        li.appendChild(storedText);

        // Append the list item to the goal container
        ul.appendChild(li);
        goalContainer.appendChild(ul);
    });   
}

document.addEventListener('DOMContentLoaded', function() {
    // Call the viewExercise function here
    viewExercise();
});

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
    
        // Set the event listener after fetching data
        document.getElementById("addExercise").addEventListener("click", function() {
            addExerciseRow(data.exerciseList);
        });
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching exercise data:', error);
    });
}

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
                    option.value = exercise.exerciseID;  
                    option.text = exercise.exerciseName;  
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


document.getElementById("saveExercise").addEventListener("click", function(e) {
    e.preventDefault();
    console.log('Save button clicked');

    var table = document.getElementById("exerciseTable");
    saveTemplate(table);
});


function saveTemplate(table) {
    // Create an array to store the template rows
    var templateRows = [];
    var templateName = document.getElementById("templateName").value;

    // Loop through each row in the table
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];

        // Create an object to represent each row
        var templateRow = {
            exerciseId: row.cells[0].querySelector('select').value,
            sets: row.cells[1].querySelector('input').value,
            reps: row.cells[2].querySelector('input').value
        };

        // Add the row object to the array
        templateRows.push(templateRow);
    }

    // Convert the array to JSON
    var templateJSON = JSON.stringify(templateRows);
    // You can now store or send templateJSON as needed
    console.log(templateJSON);
    
    fetch("http://127.0.0.1:3000/addWorkoutTemplate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            storedUserID,
            templateName,
            templateJSON,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data if needed
        console.log("Template saved successfully:", data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error saving template:', error);
    });
}

function applyTemplateCellStyle(cell) {
    cell.style.width = '100%';
    cell.style.textAlign = 'center';
    cell.style.padding = '4px';
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

function applyGoalCellStyle(cell) {
    cell.style.fontFamily = 'Nunito Sans';
    cell.style.border = "none";
    cell.style.borderBottom = "1px solid #ccc";
    cell.style.fontSize = '16px';
    cell.style.padding = '3px';
    cell.style.marginTop = '15px';
    cell.style.marginLeft = '10px';
}

// Example usage:
// addElementToGrid('Item 1');
// addElementToGrid('Item 2');
