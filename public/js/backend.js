const loginBtn = document.querySelector(".login-btn");
const registerBtn = document.querySelector(".register-btn");
const regClearBtn = document.querySelector('#register-cancel');
const loginCancelBtn = document.querySelector('#login-cancel');

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

registerBtn.addEventListener("click", () => {
  const isVisible = registerForm.style.display === "block";
  registerForm.style.display = isVisible ? "none" : "block";
  loginForm.style.display = "none";
});

loginBtn.addEventListener("click", () => {
  const isVisible = loginForm.style.display === "block";
  loginForm.style.display = isVisible ? "none" : "block";
  registerForm.style.display = "none";
});

regClearBtn.addEventListener("click", () => {
    registerForm.style.display = "none";
    registerForm.reset();
});

loginCancelBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    loginForm.reset();
});