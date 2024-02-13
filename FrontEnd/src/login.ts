document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById(
    "loginform"
  ) as HTMLFormElement | null;

  if (!loginForm) {
    console.error("Login form not found");
    return;
  }

  const usersEmail = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const emailErrorMsg = document.getElementById(
    "email-error"
  ) as HTMLParagraphElement | null;
  const usersPassword = document.getElementById(
    "password"
  ) as HTMLInputElement | null;

  if (!usersEmail || !emailErrorMsg || !usersPassword) {
    console.error("One or more form elements not found");
    return; // Exit if any essential element is missing
  }

  emailErrorMsg.style.display = "none";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = usersEmail.value.trim();
    const password = usersPassword.value.trim();

    if (email === "") {
      usersEmail.style.border = "red solid 1px";
      emailErrorMsg.style.display = "flex";
      emailErrorMsg.style.alignSelf = "left";
      emailErrorMsg.style.color = "red";
      emailErrorMsg.textContent = "Email is required";
    } else {
      usersEmail.style.border = "black solid 1px";
      emailErrorMsg.style.display = "none";
    }

    if (password === "") {
      usersPassword.style.border = "red solid 1px";
    } else {
      usersPassword.style.border = "black solid 1px";
    }

    if (email !== "" && password !== "") {
      fetch("http://localhost:3001/users/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          redirect();
        })
        .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
          )
          );
        }
      });
      
      function redirect() {
        let token = localStorage.getItem("token") as string;
        token = JSON.parse(token)
        
        
        if (!token) {
          console.error("Token not found");
          return;
        }
        
        fetch("http://localhost:3001/users/checkdetails", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${token}`,
          },
          method: "POST",
        })
        .then((response) => response.json())
        .then((data:any) => {
        // console.log("data",data);
        if (data.info.role === "admin") {
          localStorage.setItem("user_id", data.info.user_id);
          window.location.href = "../Admin/index.html";
        } else if (data.info.role === "user") {
          localStorage.setItem("user_id", data.info.user_id);
          window.location.href = "../User/userdash.html";
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});
