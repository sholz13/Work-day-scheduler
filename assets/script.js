var plannerEl = $(".container");
var currentDateEl = $("#currentDay");
var timeBlockBodyEl = $(".time-block");
var clearEventsButtonEl = $(".clear-events").on("click", clearAllEvents);

var eventFieldsEl;
var eventFieldsArray;

var currentHour = moment().hours();

var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

currentDateEl.text(currentDate);
setInterval(() => {
    currentDateEl.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}, 1000);


function buildTimeBlocks(hour){
   
  var timeRowEl = $("<tr></tr>")
        .attr("data-value", hour)
        .addClass(`d-flex time-row ${hour}`);
    timeBlockBodyEl.append(timeRowEl);
   
    var hourColumnEl = $("<td></td>")
        .attr("scope", "col")
        .addClass("d-flex col-2 col-lg-1 justify-content-center align-items-center")
        .text(moment(`${hour}`, "h").format("hA"));
    timeRowEl.append(hourColumnEl);
  
    var eventColumnEl = $("<td></td>")
        .attr("scope", "col")
        .addClass("col-8 col-lg-10");
    var eventText = $("<textarea></textarea>")
        .attr("type", "text")
        .addClass("d-flex form-control col-12 event-input");
    eventColumnEl.append(eventText);
    timeRowEl.append(eventColumnEl);
    
    var saveColumnEl = $("<td></td>")
        .attr("scope", "col")
        .addClass("d-flex col-2 col-lg-1 justify-content-center align-items-center");
    var saveButtonEl = $("<button></button>")
        .attr("type", "button")
        .addClass("btn btn-primary far fa-save fa-lg saveBtn")
        .on("click", saveEvent);
    saveColumnEl.append(saveButtonEl); 
    timeRowEl.append(saveColumnEl);
}


function highlightEvents(rowNum){
    let tableTimes = $(`.${rowNum}`);
    if (currentHour === rowNum){
        tableTimes.addClass("present");
    }
    if (currentHour > rowNum){
        tableTimes.addClass("past");
    }
    if (currentHour < rowNum){
        tableTimes.addClass("future");
    }
}

function saveEvent(){
    eventFieldsArray = [];
    eventFieldsEl = document.querySelectorAll(".event-input");
    for (let i = 0; i < eventFieldsEl.length; i++){
        eventFieldsArray.push(eventFieldsEl[i].value);
    }
    localStorage.setItem("eventsArray", JSON.stringify(eventFieldsArray));
}

function retrieveEvent(){
    eventFieldsEl = document.querySelectorAll(".event-input");
   
    if (localStorage.eventsArray === undefined){
        eventFieldsArray = [];
    } else {
        eventFieldsArray = JSON.parse(localStorage.getItem("eventsArray"));
        for (let i = 0; i < eventFieldsEl.length; i++){
            eventFieldsEl[i].value = eventFieldsArray[i]; 
        }
    }
}


function clearAllEvents(){
    eventFieldsEl = document.querySelectorAll(".event-input");
    let deleteChoice = confirm("This will clear and delete ALL events saved currently! Proceed?");
    if (deleteChoice === false){
        return;
    } else {

        if (localStorage.eventsArray === undefined){
            eventFieldsArray = [];    
        } else {
            eventFieldsArray = JSON.parse(localStorage.getItem("eventsArray"));
            for (let i = 0; i < eventFieldsEl.length; i++){
                eventFieldsEl[i].value = "";
            }
        }
        saveEvent();
        localStorage.clear();
    }
}


function initPage(){
   
    let i = 10;

    while (i < 19){
        buildTimeBlocks(i);
        highlightEvents(i);
        i++;
    }
    retrieveEvent();
}

initPage();
