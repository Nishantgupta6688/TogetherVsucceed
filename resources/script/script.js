console.log("hello register page");


//Captureing the Elements by the ID's 
let loginButton = document.getElementById("loginButton");
let registerButton = document.getElementById("registerButton");


//function that communicate with backend
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin, cross origin resourse sharing
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

//eventListener added to register button
registerButton.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default behaviour of the browser
  let lname = document.getElementById("lname");
  let fname = document.getElementById("fname");
  let username = document.getElementById("username");
  let gyear = document.getElementById("gyear");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let cpassword = document.getElementById("cpassword");

  if (
    email.value === "" ||
    password.value === "" ||
    cpassword.value === "" ||
    lname.value === "" ||
    fname.value === "" ||
    username.value == "" ||
    gyear.value === ""
  ) {
    window.alert("please provide all values first");
    return;
  }

  if (password.value !== cpassword.value) {
    window.alert("Your password are not similar");
    console.log("not equal");
    password.classList.remove("border-blue");
    cpassword.classList.remove("border-blue");
    password.classList.add("border-red");
    cpassword.classList.add("border-red");
    return;
  } else {
    password.classList.remove("border-red");
    cpassword.classList.remove("border-red");
    password.classList.add("border-blue");
    cpassword.classList.add("border-blue");
  }

  postData("http://localhost:5000/api/auth/register", {
    email: email.value,
    password: password.value,
    fname: fname.value,
    lname: lname.value,
    gyear: gyear.value,
    username: username.value,
  }).then((data) => {
    console.log(data);// JSON data parsed by `data.json()` call
    window.location.reload();
  });
});

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  let userEmail = document.getElementById("userEmail");
  let userPassword = document.getElementById("userPassword");
  if (userEmail.value === "" || userPassword.value === "") {
    window.alert("please enter valid Email Address and password first");
    return;
  }
  postData("http://localhost:5000/api/auth/login", {
    email: userEmail.value,
    password: userPassword.value,
  }).then((data) => {
    console.log(data);
    if (data.message === "success") {
      localStorage.setItem("userData", JSON.stringify(data)); // JSON data parsed by `data.json()` call
      window.alert("Login successful");
      window.location.replace("/dashboard.html");
    }else{
      window.alert("Invalid password")
    }
  });
});
