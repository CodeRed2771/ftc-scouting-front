let matchData = localStorage.matchData ? JSON.parse(localStorage.matchData) : [];
let pitData = [];

function fetchMatchData(sheetName = 'Sheet1') {
    const url = 'https://script.google.com/macros/s/AKfycbz-takae_7ZtVD_luRtAAhAQJKflLwT6JU5S_PaLo_qfxmUs0TQ3hXeLq7MBo_qHzdA/exec'; // Replace with the URL you copied from the deployment
    const params = new URLSearchParams({ sheet: sheetName });
    document.getElementById("rankings").innerHTML = `<div class="Loader"></div><h2>Loading data...</h2>`
    fetch(`${url}?${params}`)
        .then(res => res.json())
        .then(data => {
            matchData = [];
            for(let match of data) {
                if(match.Competition === document.getElementById("compSelect").value) {
                    matchData.push(match)
                }
            }
            localStorage.matchData = JSON.stringify(matchData);
            console.log(matchData);
            initAnalysis();
        })
}

function initAnalysis() {
    rankTeams();
}

initAnalysis();
fetchMatchData();