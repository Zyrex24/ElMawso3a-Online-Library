window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('main-header');
    } else {
        header.classList.remove('main-header');
    }
});

