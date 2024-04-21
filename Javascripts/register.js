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

function saveData(){
    let user,email,password,role;
    user=document.getElementById('user').value;
    email=document.getElementById('email').value;
    password=document.getElementById('pass').value;
    role=document.getElementById('role').value;
    // localStorage.setItem('user',user);
    // localStorage.setItem('email',email);
    // localStorage.setItem('password,',password);
    // localStorage.setItem('role',role);

    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]
    if(userRecords.some((v)=>{
        return v.user === user
    })){
        alert('Username already exists');
    }else{
        userRecords.push({
            "user":user,"email":email,"password":password,"role":role});
        localStorage.setItem('users',JSON.stringify(userRecords));
        alert('User registered successfully');
        window.location.href = 'login.html';
    }
}