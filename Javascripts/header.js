window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('main-header');
    } else {
        header.classList.remove('main-header');
    }
});


// function isAdmin() {
//     return document.getElementById('role').value === 'admin';
// }

// function displayHeader() {
//     var header = document.getElementById('header');
//     var adminbf = document.getElementById('header_adminbf');
    
//     if (isAdmin()) {
//         header.adminbf.classList.add('header_admin');
//     } else {
//         header.adminbf.classList.remove('header_admin');
//     }
// }

function isAdmin() {
    return document.getElementById('role').value === 'admin';
}

function displayHeader() {
    var headerAdminbf = document.getElementById('header_adminbf');
    
    if (isAdmin()) {
        headerAdminbf.style.display = 'inline-block';
    } else {
        headerAdminbf.style.display = 'none';
    }
}


displayHeader();