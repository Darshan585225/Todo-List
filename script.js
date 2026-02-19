let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");

/* ---------------- LOAD DATA FROM STORAGE ---------------- */

let savedTodos = localStorage.getItem("todoList");
let todoList = savedTodos ? JSON.parse(savedTodos) : [];

let todosCount = todoList.length;

/* ---------------- SAVE FUNCTION ---------------- */

function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

/* ---------------- CHECKBOX TOGGLE ---------------- */

function onTodoStatusChange(checkboxId, labelId, todoId) {

    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        return eachTodo.uniqueNo === todoId;
    });

    todoList[todoObjectIndex].isChecked = checkboxElement.checked;

    saveTodos();
}

/* ---------------- DELETE TODO ---------------- */

function onDeleteTodo(todoId) {

    let todoElement = document.getElementById("todo" + todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(function(eachTodo){
        return eachTodo.uniqueNo === todoId;
    });

    todoList.splice(deleteIndex, 1);

    saveTodos();
}

/* ---------------- CREATE TODO ELEMENT ---------------- */

function createAndAppendTodo(todo) {

    let todoId = todo.uniqueNo;
    let checkboxId = "checkbox" + todoId;
    let labelId = "label" + todoId;

    // li
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = "todo" + todoId;
    todoItemsContainer.appendChild(todoElement);

    // checkbox
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked === true;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    // label container
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    // label
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }

    labelContainer.appendChild(labelElement);

    // delete icon container
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    // delete icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

/* ---------------- ADD TODO ---------------- */

function onAddTodo() {

    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount++;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);

    saveTodos();
    createAndAppendTodo(newTodo);

    userInputElement.value = "";
}

/* ---------------- BUTTON EVENT ---------------- */

addTodoButton.onclick = function() {
    onAddTodo();
};

/* ---------------- LOAD TODOS ON PAGE OPEN ---------------- */

todoList.forEach(function(todo){
    createAndAppendTodo(todo);
});
