function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let feedback = document.getElementById("feedback").value;
    if(/\d/.test(name)) {
        return alert("Name must be only letters");
    }else if(!email.includes("@") || !email.includes(".")){
        return alert("Email must be valid");
    }else if(feedback.length < 10){
        return alert("Feedback must be at least 10 characters");
    }
    return alert("Feedback saved successfully");
}


function loadFeedbackFromLocalStorage() {
    let savedFeedback = localStorage.getItem('feedback');

    if (savedFeedback) {

        console.log(feedbackData.name);
        console.log(feedbackData.email);
        console.log(feedbackData.feedback);

        document.getElementById("name").value = feedbackData.name;
        document.getElementById("email").value = feedbackData.email;
        document.getElementById("feedback").value = feedbackData.feedback;
    } else {
        console.log('No feedback data found in localStorage.');
    }
}