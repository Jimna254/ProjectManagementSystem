document.addEventListener("DOMContentLoaded", () => {
  const reg_form = document.getElementById("registerForm") as HTMLFormElement;

  const user_name = document.getElementById("name") as HTMLInputElement;
  const user_email = document.getElementById("email") as HTMLInputElement;
  const area_of_specialization = document.getElementById(
    "specialization"
  ) as HTMLInputElement;
  const user_Password = document.getElementById("password") as HTMLInputElement;
  let successmsg = document.querySelector(
    ".success-msg"
  ) as HTMLParagraphElement;

  successmsg.style.display = "none";

  function navigateToLogin() {
    window.location.href = "./login.html";
  }

  reg_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = user_name.value.trim();
    let email = user_email.value.trim();
    let areaofspecialization = area_of_specialization.value.trim();
    let password = user_Password.value.trim();

    let user =
      name !== "" &&
      email !== "" &&
      areaofspecialization !== "" &&
      password !== "";

    if (user) {
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          role: "user",
          password: password,
          areaofspecialization: areaofspecialization,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          successmsg.textContent = res.message;
          successmsg.style.display = "flex";

          setTimeout(() => {
            successmsg.style.display = "none";
            navigateToLogin();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
          // Optionally, update the UI to reflect the error
        });
    } else {
      alert("Please fill in all fields.");
    }
  });
});
