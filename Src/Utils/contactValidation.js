function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var nameError = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var subjectError = document.getElementById("subjectError");
  var messageError = document.getElementById("messageError");

  nameError.innerHTML = "";
  emailError.innerHTML = "";
  subjectError.innerHTML = "";
  messageError.innerHTML = "";

  var errorMessages = "";

  if (name.length < 5) {
    errorMessages += "Name should be more than 5 characters long.<br>";
    nameError.innerHTML = "Name should be more than 5 characters long.";
  }

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    errorMessages += "Please enter a valid email address.<br>";
    emailError.innerHTML = "Please enter a valid email address.";
  }

  if (subject.length < 15) {
    errorMessages += "Subject should be more than 15 characters long.<br>";
    subjectError.innerHTML = "Subject should be more than 15 characters long.";
  }

  if (message.length < 25) {
    errorMessages +=
      "Message content should be more than 25 characters long.<br>";
    messageError.innerHTML =
      "Message content should be more than 25 characters long.";
  }

  if (errorMessages !== "") {
    return false;
  }

  return true;
}
