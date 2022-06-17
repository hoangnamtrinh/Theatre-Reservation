function login() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      getUser();
      window.location = '/home.html';
    } else if (this.readyState == 4 && this.status >= 400) {
      alert("Login Failed! Username or Password incorrect.");
      window.location = '/login.html';
    }
  };

  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ username: username, password: password }));
}

function signup() {
  let notice = document.getElementById('notice');
  let password = document.getElementById('password').value;
  let confirmedPassword = document.getElementById('confirmPassword').value;
  console.log(password);
  if (password != confirmedPassword) {
    notice.innerHTML = "Please reenter password!";
    notice.removeAttribute("hidden");
    return;
  }

  let username = document.getElementById('username').value;
  if (username.length < 8) {
    notice.innerHTML = "Username need at least 8 characters.";
    notice.removeAttribute("hidden");
    return;
  }

  // const pass_required = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  // if (!password.match(pass_required)) {
  //   notice.innerHTML = "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
  //   notice.removeAttribute("hidden");
  //   return;
  // }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Sign up sucessfully, please login to continue!");
      window.location = '/login.html';
    } else if (this.readyState == 4 && this.status >= 400) {
        alert("error");
        window.location = '/signup.html';
    }
  };

  xhttp.open("POST", "/signup", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ username: username, password: password }));
}

function getUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    }
  };

  xhttp.open("GET", "/users", true);
  xhttp.send();
}