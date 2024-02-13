const storedUserID = sessionStorage.getItem('userid');
const addressUser = sessionStorage.getItem('username');
document.getElementById('username').textContent = "Logged in as: " + addressUser;
fetch(`http://127.0.0.1:3000/?passedUserID=${storedUserID}`, {
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
    populateTable(data.runningData);
    populateGoals(data.goalData);
})
.catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
});

function populateTable(data) {
    const table = document.getElementById("tracker-sheet");
    data.forEach(item => {
        const row = table.insertRow(1);
        const values = Object.values(item).slice(2);
        console.log(values);
        values.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
            applyCellStyle(cell);
        });
    });
}

function populateGoals(data) {
    const goalContainer = document.getElementById("goal-container");
    data.forEach(item => {  
        const values = Object.values(item).slice(1, -1);
        console.log("VALUES IS ", values);
        
        var ul = document.createElement('ul');
        ul.style.width = '100%';
        var li = document.createElement('li');
        
        const storedText = document.createElement('input');
        storedText.style.border = "none";
        storedText.style.borderBottom = "1px solid #ccc";
        storedText.value = values[0];
        storedText.style.fontSize = '16px';
        storedText.style.padding = '3px';
        storedText.style.marginTop = '15px';
        storedText.style.marginLeft = '10px';
        
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

function strikeThrough(text) {
    return text
        .split('')
        .map(char => char + '\u0336')
        .join('')
}

function addRow() {
    var table = document.getElementById("tracker-sheet");
    let newRow = table.insertRow(1);
    
    for (let i = 0; i < 5; i++) {
        var cell = newRow.insertCell(i);
        var input = document.createElement("input");
        input.style.width = "100%";
        input.style.textAlign = "Center";
        switch(i) {
            case 0:
                input.type = "text";
                input.placeholder = "👟";
                break;
            case 1:
                input.type = "text";
                input.placeholder = "10";
                break;
            case 2:
                input.type = "text";
                input.placeholder = "0h40m00s";
                break;
            case 3:
                input.type = "text";
                input.placeholder = "4";
                break;
            case 4: 
                input.type = "text";
                input.readOnly = true;
                input.value = new Date().toDateString();
                break;
        }
        applyCellStyle(input);
        cell.appendChild(input);
    }

    document.getElementById("save").addEventListener("click", function() {
        saveRunningData(newRow);
    });

}

function applyCellStyle(cell) {
    cell.style.border = "1px solid #dddddd";  // Add this line to set border
    cell.style.boxSizing = "border-box";
    cell.style.fontSize = "18px";
    cell.style.padding = "4px";
    cell.style.textAlign = "center";
}

function deleteRow() {
    const table = document.getElementById("tracker-sheet");
    const runningDataId = table.rows[1].cells[0].innerText; // Assuming the ID is displayed in the first cell
    table.deleteRow(1);
}

function saveRunningData(row) {
    const name = row.cells[0].getElementsByTagName("input")[0].value;
    const distance = row.cells[1].getElementsByTagName("input")[0].value;
    const time = row.cells[2].getElementsByTagName("input")[0].value;
    const pace = row.cells[3].getElementsByTagName("input")[0].value; // Assuming you have a function to calculate pace
    const date = row.cells[4].getElementsByTagName("input")[0].value;
    console.log("Name:", name);
    console.log("Distance:", distance);
    console.log("Time:", time);
    console.log("Pace:", pace);
    console.log("Date:", date);
    fetch("http://127.0.0.1:3000/addRunningData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            storedUserID,
            name,
            distance,
            time,
            pace,
            date,
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
        return response.json();
    })
    .catch(error => {
        console.error("Save failed: ", error);
    });
}

function addGoal() {
    var goalContainer = document.getElementById("goal-container");
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.placeholder = 'Enter goal...';
    inputText.style.fontSize = '14px';
    inputText.style.padding = '1%';
    inputText.style.marginTop = '2%';
    inputText.style.marginLeft = '5%';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    li.appendChild(checkbox);
    li.appendChild(inputText);

    ul.appendChild(li);
    goalContainer.appendChild(ul);

    document.getElementById("saveGoalBtn").addEventListener("click", function() {
        saveGoal(inputText.value, checkbox.checked);
    });

}

// NEED TO MAKE THIS HAPPEN ON SAVE BUTTON CLICK NOT AUTOMATICALLY
function saveGoal(goal, status) {
    fetch("http://127.0.0.1:3000/addGoal", {
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
