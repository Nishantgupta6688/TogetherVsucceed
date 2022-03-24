console.log("View experience script");

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("userData");
});

var companyCard = document.getElementById("companyCards");
var string = "";
var companyName = [];

function renderExperience(name){
  if(localStorage.hasOwnProperty("displayExperience")){
    localStorage.removeItem("displayExperience")
    localStorage.setItem("displayExperience",name)
  }else{
    localStorage.setItem("displayExperience",name)
  }
  window.location.href = "/viewCompanyExperience.html"
}


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

postData("http://localhost:5000/api/viewexperience").then((data) => {
  data.forEach((element) => {
    if (companyName.includes(element.companyName.toLowerCase())) {
      return;
    } else {
      companyName.push(element.companyName.toLowerCase());
    }
  });

  companyName.forEach((element) => {
    string += `<td>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
            <span><strong>${element[0].toUpperCase()}</strong><small>${element.slice(1).toLowerCase()}</small></span>
            </div>
            
            <div class="flip-card-back">
              <button onclick="renderExperience('${element}')">click here</button>
            </div>
          </div>
        </div>
      </td>`;
  });
  companyCard.innerHTML = string;
});

