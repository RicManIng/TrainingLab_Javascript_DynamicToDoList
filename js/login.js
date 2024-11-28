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
}