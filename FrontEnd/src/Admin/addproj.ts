document.addEventListener("DOMContentLoaded", () => {
  const createProjectForm = document.querySelector(
    ".createProjectForm"
  ) as HTMLFormElement;
  let successmsg = document.querySelector(
    ".success-msg"
  ) as HTMLParagraphElement;

  successmsg.style.display = "none";
  createProjectForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form data
    const projectName = (
      document.getElementById("projectName") as HTMLInputElement
    ).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const createDate = (
      document.getElementById("createDate") as HTMLInputElement
    ).value;
    const endDate = (document.getElementById("endDate") as HTMLInputElement)
      .value;

    // Prepare the request payload
    const payload = {
      projectname: projectName,
      description: description,
      createdate: createDate,
      enddate: endDate,
    };

    try {
      const response = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Assuming the token is stored in localStorage or some secure place
          token: getThetoken(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Project created successfully:", data);

      // Optionally, clear the form or give user feedback
      createProjectForm.reset();
      successmsg.style.display = "flex";

      setTimeout(() => {
        successmsg.style.display = "none";
      }, 3000);
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to add project. Please try again.");
    }
  });
});
function getThetoken() {
  let token = localStorage.getItem("token") as string;

  return JSON.parse(token);
}
