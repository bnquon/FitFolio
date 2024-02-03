function addRow() {
    var table = document.getElementById("tracker-sheet");
    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
}

function deleteRow() {
    document.getElementById("tracker-sheet").deleteRow(1);
}