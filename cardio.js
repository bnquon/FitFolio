const storedUserID = sessionStorage.getItem('userid');

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
    // Handle the data received from the server
    sessionStorage.setItem('userRunningData', JSON.stringify(data));
})
.catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
});

const storedUserRunning = sessionStorage.getItem('userRunningData');
console.log(storedUserRunning);

function addRow() {
    var table = document.getElementById("tracker-sheet");
    let newRow = table.insertRow(1);

    for (let i = 0; i < 5; i++) {
        var cell = newRow.insertCell(i);
        var input = document.createElement("input");
        
        switch(i) {
            case 0:
                input.type = "text";
                input.placeholder = "👟";
                break;
            case 1:
                input.type = "number";
                break;
            case 2:
                input.type = "text";
                break;
            case 3:
                input.type = "text";
                break;
            case 4: 
                input.type = "text";
                input.readOnly = true;
                input.value = new Date().toDateString();
                break;
        }
        input.style.width = "100%";  // Set the width to 100%
        input.style.boxSizing = "border-box";
        input.style.borderCollapse = "collapse";
        input.style.fontSize = "15px";
        input.style.padding = "1%";
        input.style.textAlign = "center";
        cell.appendChild(input);
    }

    document.getElementById("save").addEventListener("click", function() {
        saveRunningData(newRow);
    });

}

function deleteRow() {
    const table = document.getElementById("tracker-sheet");
    const runningDataId = table.rows[1].cells[0].innerText; // Assuming the ID is displayed in the first cell
    deleteRunningData(runningDataId);
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
