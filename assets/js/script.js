// Date and time in the top right

let time = moment().format("MMM Do, YYYY, hh:mm:ss");
$("#timeDate").text(time);

// Drop down box to be able to choose what conference you want to see

let dropDownInput = document.getElementById('conferenceChoice')

dropDownInput.addEventListener("change", function dropDown() {
    let dropDownResults = document.getElementById('conferenceChoice');
    let dropDownValue = dropDownResults.options[dropDownResults.selectedIndex].value;

    console.log(dropDownValue)
    localStorage.setItem("dropDownValue", dropDownValue)
})

