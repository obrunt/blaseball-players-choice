

function intRoll(min, max){
    return Math.floor(Math.random() * max) + min;
}

function floatRoll(min, max){
    return Math.random() * max + min;
}

module.export = { intRoll, floatRoll };