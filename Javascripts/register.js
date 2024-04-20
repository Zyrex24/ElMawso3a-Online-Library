function validateForm(){
    let user_name = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let email = document.getElementById('email').value;
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(user_name === '' || password === '' || email === ''){
        alert('Please fill in all fields');
        return false;
    }else if(!usernameRegex.test(user_name)) {
        alert('Invalid username, make sure to use only letters, numbers and underscores and' +
            ' username must be between 4 and 16 characters');
        return false;
    }else if(document.getElementById('pass').value !==
    document.getElementById('confirmPass').value){
        alert('Passwords do not match');
        return false;
    }else if(!strongPasswordRegex.test(password)){
        alert('Password must be at least 8 characters long, contain at least one lowercase letter, ' +
            'one uppercase letter, one number and one special character');
        return false;
    }
    return true;
}