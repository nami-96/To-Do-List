//select elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

function addToDo(todo) {
    const text = <li class="item">
                <i class="co fa fa-circle-thin" job="complete"></i>
                <p class="text "> ${todo} </p>
                <i class="de fa fa-trash-o" job="delete"></i>
                </li>
    const position ="beforeend";
    list.insertAdjacentElement(position,text);
}