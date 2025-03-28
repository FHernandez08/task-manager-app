const addBtn = document.querySelector(".add-task");
const clearBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector('#myForm');

let nameInput = document.querySelector('#task-name');
let importanceImput = document.querySelector('#importance');
let categoryInput = document.querySelector('#category');
let dateInput = document.querySelector('#date');

let table = document.querySelector('#tasks-table');

let idCounter = 0;

// functions //






// buttons //
// opens the form
addBtn.addEventListener("click", () => {
    form.style.display = 'block';
});

// clears the form and closes it
clearBtn.addEventListener("click", () => {
    form.style.display = 'none';
});

// submitting the form with the details and then create the buttons to edit the form when interacting
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    idCounter += 1

    let name = nameInput.value;
    let importance = importanceImput.value;
    let category = categoryInput.value;
    let date = dateInput.value;

    let storeTask = {
        "id": idCounter,
        "name": name,
        "importance": importance,
        "category": category,
        "date": date
    }

    // adds task to local storage
    localStorage.setItem(
        "task", JSON.stringify(storeTask)
    );

    let template = `
        <tr>
        <td>${idCounter}</td>
        <td>${name}</td>
        <td>${importance}</td>
        <td>${category}</td>
        <td>${date}</td>
        <td>
            <button id="edit">Edit Task</button>
            <button id="remove">Remove Task</button>
        </td>
    `;

    table.innerHTML += template;

    form.style.display = "none";
});

