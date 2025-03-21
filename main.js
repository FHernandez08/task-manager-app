const addTaskBtn = document.querySelector(".add-task");
const addForm = document.querySelector("#add-details");
const submitBtn = document.querySelector(".submit");
const closeFormBtn = document.querySelector(".closeForm");

const categorySelect = document.getElementById("category-item");
const newOptionInput = document.getElementById("newOptionInput");

// open the form
addTaskBtn.addEventListener("click", function() {
    addForm.style.display = "block";
})

// Load categories from localStorage onto the option for categories
document.addEventListener("DOMContentLoaded", function() {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];

    savedCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(category);
    })
})

// adding the values from form into the localStorage
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const newCategory = newOptionInput.value.trim();

    if (newCategory) {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];

        if (!savedCategories.includes(newCategory)) {
            savedCategories.push(newCategory);
            localStorage.setItem("categories", JSON.stringify(savedCategories));

            const option = document.createElement("option");
            option.value = newCategory;
            option.textContent = newCategory;
            categorySelect.appendChild(newCategory);
        }

        newOptionInput.value = '';
    }

    const titleName = document.getElementById("task-title").value;
    const importance = document.getElementById("task-importance").value;
    const taskDate = document.getElementById("task-date").value;
    const selectedCategory = categorySelect.value;

    const taskData = {
        titleName,
        importance,
        taskDate,
        category: selectedCategory
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addForm.reset();
    addForm.style.display = "none";
});

// closing the form w/ close button
closeFormBtn.addEventListener("click", function() {
    addForm.reset();
    addForm.style.display = "none";
})
