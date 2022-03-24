console.log("viewCompanyExperience");

var element  = document.getElementById("companyCards");

var localData = localStorage.getItem("displayExperience");
var companyName = [];
var string = "";


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
      if(element.companyName.toLowerCase() == localData.toLowerCase()){
          companyName.push(element)
      }
    })
    console.log(companyName);
    companyName.forEach((data) => {
        string += `<td>
        <div class="flip-card">
          <div class="flip-card-inner">
            <strong>Posted by:</strong>&nbsp;<label>${data.postedBy}</label></br>
            <strong>Company Name:</strong>&nbsp;<label>${data.colName}</label></br>
            <strong>Branch:</strong>&nbsp;<label>${data.branch}</label></br>
            <strong>CGPA:</strong>&nbsp;<label>${data.cgpa}</label></br>
            <strong>backlogs:</strong>&nbsp;<label>${data.backlogs}</label></br>
            <strong>No of Questions:</strong>&nbsp;<label>${data.nQuestions}</label></br>
            <strong>backlogs:</strong>&nbsp;<label>${data.backlogs}</label></br>
            <strong>tips:</strong>&nbsp;<label>${data.tips}</label></br>
          </div>
        </div>
      </td>`
    })

    element.innerHTML = string;

})