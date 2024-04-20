function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let feedback = document.getElementById("feedback").value;
    if(/\d/.test(name)) {
        alert("Name must be only letters");
        return false;
    }else if(!email.includes("@") || !email.includes(".")){
        alert("Email must be valid");
        return false;
    }else if(feedback.length < 10){
        alert("Feedback must be at least 10 characters");
        return false;
    }
    return true;
}