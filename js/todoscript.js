// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear"); // clear = { addEventListener: function}
const dateElement = document.getElementById("date"); // dateElement = { innerHTML: '' }
const list = document.getElementById("list"); // list = { insertAdjacentHTML:function(position,item) , addEventListener: function(eventName, function(eventObject)) }
const input = document.getElementById("input"); // input = {value: ""}
// const test = function updateRecords()
// Classes names
const CHECK = "fa-check-circle"; // check = "fa-check-circle"
const UNCHECK = "fa-circle-thin"; // ..
const LINE_THROUGH = "lineThrough"; // ..

// Variables
let LIST, id; // first pass, LIST =+
// get item from localstorage
let data = localStorage.getItem("TODO"); // data = null

// check if data is not empty
if(data) { // data = null

    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface // [{name: "", id: "", done: false, trash: false}]
} else {
    // if data isn't empty
    LIST = []; // LIST = []
    // LIST = [1,2,3]
    // LIST = []
    // [] [""] [null] [undefined] undefined null
    id = 0; // id = 0
}

// // you are javascript creator, then u defined array.forEach
// const array = [1,2,3];
// function array.forEach(callbackFn) { // callbackfn = addItemToTodo
//     for (let i = 0; i < array.length; i++) { // i = 0
//         callbackFn(array[i], i, array) // first_param = 1, second_param = 0, third_param = [1,2,3]
//     }
// }
// load items to the user's interface
function loadList(array) {
    array.forEach(function (item) { 
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date(); // { toLocaleDateString: function (locale, options) }

dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// add to do function

function addToDo(toDo, id, done, trash) {
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend"; 
    
    list.insertAdjacentHTML(position, item);
    
}

// add an item to the list user the enter key
document.addEventListener("keyup", function(event){
    //console.log("event is...", event);
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = ""; //clears back the input
        
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    console.log(element.attributes)
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    console.log(JSON.stringify(LIST))
    console.log(JSON.stringify(localStorage))
});