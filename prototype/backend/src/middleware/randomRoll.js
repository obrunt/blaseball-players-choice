

function roll(min, max){
    return Math.floor(Math.random() * max) + min;
}

module.export = { roll };