//sign-up
async function signup() {
  const email = signupEmail.value;
  const password = signupPassword.value;

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.message);
}
// login
async function login() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  localStorage.setItem("token", data.token);
  alert("Login successful");
}
// get-profile
async function getProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();
  console.log(data);
}
