function enableButton(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if(username != "" && password != ""){
        var button = document.getElementById('submit');
        button.disabled = false;
    }
}

window.onload = function(){
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    username.onkeyup = enableButton;
    password.onkeyup = enableButton;
    if (document.getElementsByClassName('error').length > 0){
        password.style.marginBottom = "1vh";
        let error = document.getElementsByClassName('error')[0];
        error.style.marginBottom = "5vh";
    }
}