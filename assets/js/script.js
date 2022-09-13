let time = moment().format("MMM Do, YYYY, hh:mm:ss");
$("#timeDate").text(time);

// let dropDownResults = document.getElementById("conferenceChoice")
// let dropDownValue = dropDownResults[dropDownResults.selectedIndex]
let selectBtn = document.getElementById('selectBtn')


selectBtn.addEventListener("click", function name(params) {
    let dropDownResults = document.getElementById('conferenceChoice');
    let dropDownValue = dropDownResults.options[dropDownResults.selectedIndex].value;

    console.log(dropDownValue)
    localStorage.setItem("dropDownValue", dropDownValue)
})

