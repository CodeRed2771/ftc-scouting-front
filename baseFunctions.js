function orderArray(arr) {
    arr.sort((a, b) => a - b);
    //sorts array from least to greatest

    return arr;
}

function mode(arr) {
    let summed = {};
    let max = 0;
    let num = [];

    for (var i = 0; i < arr.length; i++) {
        if (!summed[arr[i]]) {
            summed[arr[i]] = 0;
        }
        summed[arr[i]] += 1;
    }

    for (var i = 0; i < Object.keys(summed).length; i++) {
        if (max <= summed[Object.keys(summed)[i]]) {
            if (max < summed[Object.keys(summed)[i]]) {
                max = summed[Object.keys(summed)[i]];
                num = [];
                num.push(Object.keys(summed)[i]);
            } else if (max == summed[Object.keys(summed)[i]]) {
                num.push(Object.keys(summed)[i]);
            }
        }
    }

    return num;
}

function median(med) {
    med = orderArray(med);

    let median;
    let value = med.length;

    if (value % 2 == 0) {
        value = value / 2 - 1;
        median = med[value];
    } else {
        value = value / 2
        let indexone = value + .5;
        let indextwo = value - .5;
        median = (med[indexone] + med[indextwo]) / 2;
    }

    return median;
}

function mean(avr) {
    let total = 0;

    for (var i = 0; i < avr.length; i++) {
        total += avr[i];
        //ts finds the total of numbers in the array
    }

    total = total / avr.length;

    return total;
}

function filterTeam(team) {
    const filtered = matchData.filter(n => n["Team Number"] === team);

    return filtered;
}

function addAllStatsToArray(matches, stat) {
    let array = [];

    for (const match of matches) {
        array.push(match[stat]);
    }

    return array;
}

function sumArray(array) {
    let arraySum = 0;
    
    for(let i = 0; i < array.length; i++){
        arraySum += array[i];
    }
    
    return arraySum;
}
