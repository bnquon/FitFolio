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
                input.readOnly = true;
                input.placeholder = "We will calculate this!"
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
}

function deleteRow() {
    document.getElementById("tracker-sheet").deleteRow(1);
}