window.onload = function() {
    loadUserInfoFromLocalStorage();
};


function toggle_password_visibility() {
    let password = document.getElementById("password");
    let check = document.getElementById("showPasswordCheckbox");
    if (check.checked) {
        password.type = "text";
    } else {
        password.type = "password";
    }
}


function saveUserInfoToLocalStorage() {
    let user_name = document.getElementById("user").value;
    let user_password = document.getElementById("password").value;
    let user_email = document.getElementById("email").value;


    let userInfo = {
        name: user_name,
        password: user_password,
        email: user_email
    };


    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}


function loadUserInfoFromLocalStorage() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        document.getElementById("user").value = userInfo.name;
        document.getElementById("password").value = userInfo.password;
        document.getElementById("email").value = userInfo.email;
    }
}


document.getElementById("showPasswordCheckbox").addEventListener('change', toggle_password_visibility);


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveUserInfoToLocalStorage();
});