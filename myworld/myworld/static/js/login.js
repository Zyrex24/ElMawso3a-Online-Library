// function saveData() {
//     let user,password;
//     user=document.getElementById('user').value;
//     password=document.getElementById('pass').value;

//     let userRecords = new Array();
//     userRecords = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]

//     if(userRecords.some((v)=>{
//         return v.user === user && v.password === password
//     })){
//         alert('Login successful');
//         let currentUser = userRecords.filter((v)=>{
//             return v.user === user && v.password === password
//         })[0]

//         if (role === 'admin') {
//             localStorage.setItem('admin',currentUser.role);
//             localStorage.setItem('user',currentUser.user);
//             window.location.href = 'admin.html';
//         } else {
//             localStorage.setItem('user',currentUser.role);
//             localStorage.setItem('user',currentUser.user);
//             window.location.href = 'index.html';
//         }

//     }else{
//         alert('Invalid credentials');
//     }
// }


function saveData() {
    let user, password, role;
    user = document.getElementById('user').value;
    password = document.getElementById('pass').value;

    let userRecords = JSON.parse(localStorage.getItem('users')) || [];

    if (userRecords.some((v) => {
        return v.user === user && v.password === password;
    })) {
        alert('Login successful');
        let currentUser = userRecords.filter((v) => {
            return v.user === user && v.password === password;
        })[0];

        role = currentUser.role;

        if (role === 'admin') {
            localStorage.setItem('admin', currentUser.user);
            localStorage.setItem('user', currentUser.user);
            window.location.href = 'admin.html';
        } else {
            localStorage.setItem('user', currentUser.user);
            window.location.href = 'index.html';
        }

    } else {
        alert('Invalid credentials');
    }
}
