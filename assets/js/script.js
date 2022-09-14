// Date and time in the top right
let time = moment().format("MMM Do, YYYY, hh:mm:ss");
$("#timeDate").text(time);

let currentTime = setInterval(function () {
    let time = moment().format("MMM Do, YYYY, hh:mm:ss");
    $("#timeDate").text(time);
}, 1000)

function test() {
    renderLastRegistered()
}
// Drop down box to be able to choose what conference you want to see

let conferenceDropDownInput = document.getElementById('conferenceChoice')
let favoriteTeam = document.getElementById("teamName")
let favoriteTeamDropDown = document.getElementById('favoriteTeam')
let lastFavoriteTeam = localStorage.getItem("favoriteTeam");
let favoriteTeamDropDownResults = document.getElementById('favoriteTeam');
let lastChosenConference = localStorage.getItem("lastChosenConference");

conferenceDropDownInput.addEventListener("change", function conferenceDropDown() {
    let dropDownResults = document.getElementById('conferenceChoice');
    let lastChosenConference = dropDownResults.options[dropDownResults.selectedIndex].value;
    
    console.log(lastChosenConference)
    localStorage.setItem("lastChosenConference", lastChosenConference)
})

// Drop down box to be able to choose what your favorite team is


favoriteTeamDropDown.addEventListener("change", function favoriteTeamDropDown() {
    let favoriteTeamDropDownResults = document.getElementById('favoriteTeam');
    let favoriteTeamDropDown = favoriteTeamDropDownResults.options[favoriteTeamDropDownResults.selectedIndex].value;

    console.log(favoriteTeamDropDown)
    localStorage.setItem("favoriteTeam", favoriteTeamDropDown) 
    favoriteTeam.innerText = favoriteTeamDropDown
})


favoriteTeam.textContent = lastFavoriteTeam
favoriteTeamDropDownResults.value = lastFavoriteTeam

conferenceDropDownInput.value = lastChosenConference

