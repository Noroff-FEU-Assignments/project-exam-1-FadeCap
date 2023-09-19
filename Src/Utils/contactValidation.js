function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var errorMessages = "";

    if (name.length < 5) {
        errorMessages += "Name should be more than 5 characters long.<br>";
    }

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        errorMessages += "Please enter a valid email address.<br>";
    }

    if (subject.length < 15) {
        errorMessages += "Subject should be more than 15 characters long.<br>";
    }

    if (message.length < 25) {
        errorMessages += "Message content should be more than 25 characters long.<br>";
    }

    if (errorMessages !== "") {
        document.getElementById("errorMessages").innerHTML = errorMessages;
        return false;
    }


    return true;
}