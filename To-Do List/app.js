const inputBox = document.querySelector("#input-box");
const taskList = document.querySelector(".list-container");
const trashBtns = document.querySelectorAll("ul li span i")
const listContainer = document.querySelector(".list-container");


//function for Adding a Task 
addEventListener("keypress", (evt) => {
    if(evt.key === "Enter"){
        addTask();
    }
});

const addTask = () => {
    if(inputBox.value === ''){
        alert("Task cannot be Empty!");
    }else{
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerHTML = "<i class='fa-solid fa-trash'></i>";
        li.innerText = inputBox.value;
        li.appendChild(span);
        taskList.append(li);
    }
    inputBox.value = '';
    saveData();
}

//function for Removing a Task 
listContainer.addEventListener("click", (evt) => {
    removeTask(evt.target);
    markAsCompleted(evt.target);
});

const removeTask = (e) => {
    if(e.parentElement.tagName.toUpperCase() === "SPAN"){
        (e.parentElement).parentElement.remove();
        saveData();
    }
}

//function to Save data in browsers local storage
const saveData = () => { 
    localStorage.setItem("data", listContainer.innerHTML);
};

//function to mark a task as completed
const markAsCompleted = (e) => {
    if(e.tagName.toUpperCase() === "LI"){
        e.classList.toggle("checked");
        saveData();
    }
}

//function to load the tasks from local browsers storage
const showTasks = () => {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTasks();