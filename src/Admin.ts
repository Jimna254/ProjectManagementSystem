import * as toastr from "toastr";
(<any>toastr).options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
let createProjectForm = document.querySelector(
  ".createProjectForm"
) as HTMLFormElement;

let projectname = document.querySelector("#projectName") as HTMLInputElement;
let assignedUser = document.querySelector("#userAssign") as HTMLInputElement;
let projectdescription = document.querySelector(
  "#description"
) as HTMLInputElement;
let datecreated = document.querySelector("#createDate") as HTMLInputElement;
let projectdeadline = document.querySelector("#enddate") as HTMLInputElement;

interface Project {
  projectId: number;
  projectname: string;
  assignedUser: string;
  description: string;
  createDate: string;
  deadLine: string;
}

let Projects: Project[] = [];

createProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let project =
    projectname.value.trim() != "" &&
    assignedUser.value.trim() != "" &&
    projectdescription.value.trim() !== "" &&
    datecreated.value.trim() !== "" &&
    projectdeadline.value.trim() != "";

  // const current_date: Date = new Date();

  if (project) {
    let Project_Details = {
      projectId: Projects.length + 1,
      projectname: projectname.value,
      assignedUser: assignedUser.value,
      description: projectdescription.value,
      createDate: datecreated.value,
      deadLine: projectdeadline.value,
    };
    Projects.push(Project_Details);
    localStorage.setItem("projects", JSON.stringify(Projects));

    //Reset the form input fields
    projectname.value = "";
    assignedUser.value = "";
    projectdescription.value = "";
    datecreated.value = "";
    projectdeadline.value = "";
    toastr.success("New Project Created Successfully!");
  } else {
    toastr.error("Please fill all the required details");
  }
});

//Displaying projects from Local Storage to HTML
