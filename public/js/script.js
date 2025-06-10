document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcome-message");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const token = localStorage.getItem("token");

  if (token && firstName && lastName) {
    welcomeMessage.textContent = `Welcome, ${firstName} ${lastName}!`;
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }
  else {
    welcomeMessage.textContent = "Welcome to the Task Manager App!";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }

  loginBtn.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  registerBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Registration
  document.querySelector("#registerForm form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name-detail").value;
    const lastName = document.getElementById("last-name-detail").value;
    const email = document.getElementById("email-detail").value;
    const password = document.getElementById("pw-detail").value;

    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    const message = await res.text();
    if (res.status === 201) {
      alert("Registration successful! You may now log in.");
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    } else {
      alert("Registration failed: " + message);
    }
  });

  // Login
  document.querySelector("#loginForm form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email-lg").value;
    const password = document.getElementById("login-pw").value;

    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.data) {
      localStorage.setItem("token", data.data);
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("lastName", data.user.lastName);
      alert("Login successful!");

      welcomeMessage.textContent = `Welcome, ${data.user.firstName} ${data.user.lastName}!`;
      loginForm.style.display = "none";
      registerForm.style.display = "none";

      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      alert("Login failed: " + (data.message || "Unknown error"));
    }
  });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    welcomeMessage.textContent = "Welcome to the Task Manager App!";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    location.reload(); // Reload to reset UI and show default welcome message
  });
});
