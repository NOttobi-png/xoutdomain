function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_likg1pa", "template_h1r6135", parms)
    .then(function(response) {
      alert("Email sent successfully!");
    }, function(error) {
      alert("Failed to send email. Please try again.");
      console.error(error);
    });
}
