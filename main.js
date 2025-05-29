const addBtn = document.querySelector(".add-task");
const clearBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector('#myForm');
const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');

const filterBtn = document.querySelector("#filterCompleted");
const showAllBtn = document.querySelector("#showAll");
const darkModeToggle = document.getElementById("darkModeToggle");
const registerBtn = document.querySelector("#register-btn");
const loginBtn = document.querySelector("#login-btn");

let nameInput = document.querySelector('#task-name');
let importanceInput = document.querySelector('#importance');
let categoryInput = document.querySelector('#category');
let dateInput = document.querySelector('#date');

let table = document.querySelector('#tasks-table');
let tableBody = document.querySelector('#tasks-body');
let taskId = null;
let idCounter = 0;
let tasks = [];

// buttons //
// opens the form
addBtn.addEventListener("click", () => {
    form.style.display = 'block';
});

// clears the form and closes it
clearBtn.addEventListener("click", () => {
    form.style.display = 'none';
    form.reset();
    taskId = null;
});

registerBtn.addEventListener("click", () => {
    
});

loginBtn.addEventListener("click", () => {

});

// function to clear the table adn re-add rows based on filtered results //
function renderTasks(taskArray) {
    tableBody.innerHTML = "";

    taskArray.forEach(task => {
        const row = document.createElement('tr');

        if (task.completed) {
            row.style.backgroundColor = "gray";
            row.style.textDecoration = "line-through";
        }

        row.innerHTML = `
        <tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${task.importance}</td>
            <td>${task.category}</td>
            <td>${task.date}</td>
            <td class="button-row">
                <button class="edit" data-id="${task.id}">Edit Task</button>
                <button class="remove" data-id="${task.id}">Remove Task</button>
            </td>
            <td>
                <input type="checkbox" name="completed-task" class="complete-task" data-id="${task.id}" ${task.completed ? "checked" : ""}>
            </td>
        </tr>`;

        tableBody.appendChild(row);
    })
}


// submitting the form with the details and then create the buttons to edit the form when interacting
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    idCounter += 1

    let name = nameInput.value;
    let importance = importanceInput.value;
    let category = categoryInput.value;
    let date = dateInput.value;

    let storeTask = {
        "id": idCounter,
        "name": name,
        "importance": importance,
        "category": category,
        "date": date,
        "completed": false
    }

    tasks.push(storeTask);

    // adds task to local storage
    localStorage.setItem(
        "task", JSON.stringify(tasks)
    );

    // checks if the task exists or not to determine to edit or create a new task row
    // if it exists
    if (taskId) {
        const row = document.querySelector(`[data-id="${taskId}"]`).closest('tr');
        const cells = row.querySelectorAll('td');

        cells[1].textContent = name;
        cells[2].textContent = importance;
        cells[3].textContent = category;
        cells[4].textContent = date;

        form.style.display = "none";
        form.reset();
        taskId = null;
    }

    // if it doesn't exist -> creating a new row
    else {
        let template = `
        <tr>
            <td>${idCounter}</td>
            <td>${name}</td>
            <td>${importance}</td>
            <td>${category}</td>
            <td>${date}</td>
            <td class="button-row">
                <button class="edit" data-id="${idCounter}">Edit Task</button>
                <button class="remove" data-id="${idCounter}">Remove Task</button>
            </td>
            <td>
                <input type="checkbox" name="complete-task" class="complete-task" data-id="${idCounter}">
            </td>
        </tr>`;

        // using tableBody instead of table keeps the headers intact and not affecting the overall table (preferred) **4/18**
        tableBody.innerHTML += template;
    }

    // clears the form and hides it to create new task
    form.style.display = "none";
    form.reset();
    taskId = null;
});

table.addEventListener("click", function (event) {

    // uploads the current task and allows modifications when button clicked
    if (event.target.classList.contains("edit")) {
        taskId = event.target.dataset.id;
        form.style.display = 'block';

        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');

        nameInput.value = cells[1].textContent;
        importanceInput.value = cells[2].textContent;
        categoryInput.value = cells[3].textContent;
        dateInput.value = cells[4].textContent;
    };

    // remove the tasks currently present
    if (event.target.classList.contains("remove")) {
        const row = event.target.closest('tr');
        const taskId = parseInt(event.target.dataset.id);

        tasks = tasks.filter(t => t.id !== taskId);

        localStorage.setItem("task", JSON.stringify(tasks));

        if (row) {
            row.remove();
        }
    };

    // completes the task
    if (event.target.classList.contains("complete-task")) {
        const row = event.target.closest('tr');
        const taskId = parseInt(event.target.dataset.id);

        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = event.target.checked;
        }

        if (event.target.checked) {
            row.style.backgroundColor = "gray";
            row.style.textDecoration = "line-through";
        }

        else {
            row.style.backgroundColor = "white";
            row.style.textDecoration = "none";
        };

        localStorage.setItem("task", JSON.stringify(tasks));
    };
});

// functionality for the show completed tasks/all tasks
filterBtn.addEventListener("click", () => {
    const completedTasks = tasks.filter(task => task.completed);
    renderTasks(completedTasks);
})

showAllBtn.addEventListener("click", () => {
    renderTasks(tasks);
})

// load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("task"));
    if (storedTasks) {
        tasks = storedTasks;
        idCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
        renderTasks(tasks);
    }
});

// to add dark mode to the page
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const darkModeOn = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkModeOn ? "on" : "off");
});