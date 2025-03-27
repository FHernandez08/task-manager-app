const addBtn = document.querySelector(".add-task");
const clearBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");







// buttons //
// opens the form
addBtn.addEventListener("click", () => {
    const form = document.querySelector("#myForm");
    form.style.display = 'block';
});

// clears the form and closes it
clearBtn.addEventListener("click", () => {
    const form = document.querySelector("#myForm");
    form.style.display = 'none';
});

// submitting the form with the details and then create the buttons to edit the form when interacting
submitBtn.addEventListener("click", () => {
    
});