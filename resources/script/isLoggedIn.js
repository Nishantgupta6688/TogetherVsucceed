// This script is for checking whether the user is loggedIn or not.
//If the user is not loggedIn then user will be redirected to landing or index page.
if(localStorage.hasOwnProperty("userData")){

}else{
    window.alert("You must log in first");
    window.location.href = "/";
}