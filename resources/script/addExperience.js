console.log("add experinece"); // for checking script attachment

//Captureing the Elements by the ID's 
let companyName = document.getElementById("companyName");
let mode = document.getElementById("mode");
let branch = document.getElementById("branch");
let cgpa = document.getElementById("cgpa");
let backlogs = document.getElementById("backlogs");
let rounds = document.getElementById("rounds");
let nQuestions = document.getElementById("nQuestions");
let questions = document.getElementById("questions");
let tips = document.getElementById("tips");
let submitButton = document.getElementById("submitButton");
let resetButton = document.getElementById("resetButton");
let companyNamesList = document.getElementById("companyNamesList");

//variables to be used in the logic
let string = "";
let companyNameListArray = [];


//function that communicate with backend
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
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

//function call
postData("http://localhost:5000/api/viewexperience").then((data) => {
  data.forEach((element) => {
    if (companyNameListArray.includes(element.companyName.toLowerCase())) {
      return;
    } else {
      companyNameListArray.push(element.companyName.toLowerCase());
    }
  });

  companyNameListArray.forEach((element) => {
    string += `<option value="${element}">${element[0].toUpperCase()}${element.slice(1)}</option>`;
  });
  companyNamesList.innerHTML = string;
});


//EventListener added to submit button
submitButton.addEventListener("click", function (e) {
  e.preventDefault(); // prevent the default behavior of a button click i.e refreshing the page.
  let data = JSON.parse(localStorage.getItem("userData")); //Capturing data from localstorage

  //Form Validation , no filed should be left empty
  if (
    companyName.value === "" ||
    mode.value === "" ||
    branch.value === "" ||
    cgpa.value === "" ||
    backlogs.value === "" ||
    rounds.value === "" ||
    nQuestions.value === "" ||
    questions.value === "" ||
    tips.value === ""
  ) {
    window.alert("Filling of all fields is neccessary in this form");
    return;
  }

  //Data sent to backend server
  postData("http://localhost:5000/api/form/addexperience", {
    postedBy: data.email,
    companyName: companyName.value,
    mode: mode.value,
    branch: branch.value,
    cgpa: cgpa.value,
    backlogs: backlogs.value,
    rounds: rounds.value,
    nQuestions: nQuestions.value,
    questions: questions.value,
    tips: tips.value,
  }).then((data) => {
    console.log(data);
    window.location.href = "/index.html";
    window.alert("Added successfully");
  });
});


//eventListener added to reset button
resetButton.addEventListener("click", function () {
  if (window.confirm("Are you sure you want to reset the values? ") == true) {
    companyName.value = "";
    mode.value = "";
    branch.value = "";
    cgpa.value = "";
    backlogs.value = "";
    rounds.value = "";
    nQuestions.value = "";
    questions.value = "";
    tips.value = "";
    return;
  }
});
