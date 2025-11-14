let teamstats = [];

/* returns success percentage of auto leave */
function autoLeave(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Auto Leave?");
    let successes = 0;

    for (let i = 0; i < stats.length; i++) {
        if(stats[i] == "Yes") {
            successes += 1;
        }
    }

    let successPercentage = successes / stats.length;

    return successPercentage;
}

function autoClassified(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Auto Artifacts In Alliance Goal Classified");

    return avgArray(stats);
}

function autoOverflow(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Auto Artifacts In Alliance Goal Overflow");

    return avgArray(stats);
}

function teleopClassified(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Teleop Artifacts In Alliance Goal Classified");

    return avgArray(stats);
}

function teleopOverflow(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Teleop Artifacts In Alliance Goal Overflow");

    return avgArray(stats);
}

function teleopDepot(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Artifacts in depot");

    return avgArray(stats);
}

function park(team) {
    let filtered = filterTeam(team);
    let stats = addAllStatsToArray(filtered, "Park");
    let partial = 0;
    let full = 0;
    let double = 0;

    for (let i = 0; i < stats.length; i++) {
        if(stats[i] == "Robot Partially In Base") {
            partial += 1;
        } else if(stats[i] == "Robot Fully In Base") {
            full += 1;
        } else if(stats[i] == "Double Parked (raised)"){
            double += 1;
        }
    }

    let partialsp = partial / stats.length;
    let fullsp = full / stats.length;
    let doublesp = double / stats.length;

    return [partialsp, fullsp, doublesp];
}

function scoreTeam(team) {
    let parkp = park(team);

    let parkpoints = (parkp[0] * 5) + (parkp[1] * 10) + (parkp[1] * 20);
    let autoLeavePoints = autoLeave(team) * 3;
    let aopoints = autoOverflow(team) * 1;
    let acpoints = autoClassified(team) * 3;
    let topoints = teleopOverflow(team);
    let tcpoints = teleopClassified(team) * 3;
    let depotpoints = teleopDepot(team) * 1;

    return [
        Math.round((parkpoints + autoLeavePoints + aopoints * 1.4 + acpoints + tcpoints + topoints + depotpoints * 0.8) * 100) / 100,
        Math.round((autoLeavePoints + aopoints + acpoints) * 100) / 100,
        Math.round((tcpoints + topoints + depotpoints + parkpoints) * 100) / 100
    ];
}

function rankTeams() {

    let unfiltered = addAllStatsToArray(matchData, "Team Number");
    let teams = unfiltered.filter((value, index) => unfiltered.indexOf(value) === index && value != "");
    teamstats = [];

    for(let team of teams) {
        let teamobj = {team: team, suitability: scoreTeam(team)[0], autoPoints: scoreTeam(team)[1], teleopPoints: scoreTeam(team)[2]};

        teamstats.push(teamobj);
    }

    filterList("suitability")
}

function filterList(type) {
    document.getElementById("rankings").innerHTML = "";
    teamstats.sort((a, b) => b[type] - a[type])
    for(let teami in teamstats) {
        let team = teamstats[teami];
        document.getElementById("rankings").innerHTML += `
            <div class="teamitem"><div id="rank">${Number(teami) + 1}</div><div id="teamnumber">${team.team}</div><div>Suitability: ${team.suitability}</div><div>Auto Points: ${team.autoPoints}</div><div>Teleop Points: ${team.teleopPoints}</div><div><input type="checkbox" onclick="this.parentElement.parentElement.classList.toggle('strikethrough', this.checked)"></div></div>
        `
    }
}