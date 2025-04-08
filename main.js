const addBtn = document.querySelector(".add-task");
const clearBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector('#myForm');

let nameInput = document.querySelector('#task-name');
let importanceInput = document.querySelector('#importance');
let categoryInput = document.querySelector('#category');
let dateInput = document.querySelector('#date');

let table = document.querySelector('#tasks-table');
let taskId = null;
let idCounter = 0;

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

// submitting the form with the details and then create the buttons to edit the form when interacting
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    idCounter += 1

    let name = nameInput.value;
    let importance = importanceInput.value;
    let category = categoryInput.value;
    let date = dateInput.value;

    let storeTask = {
        "id": idCounter + 1,
        "name": name,
        "importance": importance,
        "category": category,
        "date": date
    }

    // adds task to local storage
    localStorage.setItem(
        "task", JSON.stringify(storeTask)
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
            <td>
                <button class="edit" data-id="${idCounter}">Edit Task</button>
                <button class="remove" data-id="${idCounter}">Remove Task</button>
            </td>
        </tr>`;

        table.innerHTML += template;
    }

    // clears the form and hides it to create new task
    form.style.display = "none";
    form.reset();
    taskId = null;
});

table.addEventListener("click", function (event) {
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

    if (event.target.classList.contains("remove")) {
        const row = event.target.closest('tr');
        if (row) {
            row.remove();
        }
    };
})