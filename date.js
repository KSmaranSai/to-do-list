// jshint esversion:6

function getDate() {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    day = today.toLocaleDateString("en-US", options);
    return day;
}

function getDay() {
    let today = new Date();
    let options = {
        weekday: "long",
    }
    day = today.toLocaleDateString("en-US", options);
    return day;
}

module.exports = {getDate,getDay}; //the down and this do the same thing
// module.exports = {getDate,getDay};


// exports.getDate = function (){
//     let today = new Date();
//     let options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     }
//     day = today.toLocaleDateString("en-US", options);
//     return day;
// }