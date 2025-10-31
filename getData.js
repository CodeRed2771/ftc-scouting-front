let matchData = localStorage.matchData ? JSON.parse(localStorage.matchData) : [];
let pitData = [];

function fetchMatchData(sheetName = 'Sheet1') {
    const url = 'https://script.google.com/macros/s/AKfycbz-takae_7ZtVD_luRtAAhAQJKflLwT6JU5S_PaLo_qfxmUs0TQ3hXeLq7MBo_qHzdA/exec'; // Replace with the URL you copied from the deployment
    const params = new URLSearchParams({ sheet: sheetName });
    fetch(`${url}?${params}`)
        .then(res => res.json())
        .then(data => {
            matchData = data
            localStorage.matchData = JSON.stringify(matchData);
            console.log(matchData);
            initAnalysis();
        })
}

fetchMatchData();

function initAnalysis() {
    rankTeams();
}

initAnalysis();