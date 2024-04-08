document.querySelector(".login__btn").addEventListener("click", function () {
  const account = document.querySelector("#login__user").value;
  const password = document.querySelector("#login__pw").value;
  console.log(account);
  console.log(password);
  if (isValidPassword(password)) {
    // Password is valid
    console.log("Password is valid.");
    alert("Welcome!");

    window.location.href = "../../main/html/index.html";

  } 
  else if(account == "" || password == ""){
    alert("Please enter both Username and Password!");
  }
  else {
    // Password is invalid
    console.log(
      "Password is invalid. It must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and be 8 characters long."
    );
    alert(
      "Password is invalid. It must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and be 8 characters long."
    );
  }
});


function isValidPassword(password) {
  // Password must be at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Password must contain at least one uppercase letter, one lowercase letter, and one number
  var hasUpperCase = false;
  var hasLowerCase = false;
  var hasNumber = false;

  for (var i = 0; i < password.length; i++) {
    var char = password.charAt(i);
    if (char >= "A" && char <= "Z") {
      hasUpperCase = true;
    } else if (char >= "a" && char <= "z") {
      hasLowerCase = true;
    } else if (!isNaN(parseInt(char))) {
      hasNumber = true;
    }
  }

  return hasUpperCase && hasLowerCase && hasNumber;
}
