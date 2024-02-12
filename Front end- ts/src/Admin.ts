let createProjectForm = document.querySelector(
  ".createProjectForm"
) as HTMLFormElement;

let projectname = document.querySelector("#projectName") as HTMLInputElement;
let assignedUser = document.querySelector("#userAssign") as HTMLInputElement;
let projectdescription = document.querySelector(
  "#description"
) as HTMLInputElement;
let datecreated = document.querySelector("#createDate") as HTMLInputElement;
let projectdeadline = document.querySelector("#endDate") as HTMLInputElement;

let currentIndex: number;
interface Project {
  projectId: number;
  projectname: string;
  assignedUser: string;
  description: string;
  createDate: string;
  deadLine: string;
}

let Projects: Project[] = [];

if (window.location.pathname.endsWith("addProject.html")) {
  createProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    loadProjectsFromLocalStorage();

    let project =
      projectname.value.trim() != "" &&
      assignedUser.value.trim() != "" &&
      projectdescription.value.trim() !== "" &&
      datecreated.value.trim() !== "" &&
      projectdeadline.value.trim() != "";

    if (project) {
      let Project_Details = {
        projectId: Projects.length + 1,
        projectname: projectname.value.trim(),
        assignedUser: assignedUser.value.trim(),
        description: projectdescription.value.trim(),
        createDate: datecreated.value.trim(),
        deadLine: projectdeadline.value.trim(),
      };
      if (currentIndex) {
        Projects.splice(currentIndex, 1, Project_Details);
      } else {
        Projects.push(Project_Details);
        localStorage.setItem("projects", JSON.stringify(Projects));
      }

      projectActions.createAndDisplayTable();
      //Reset the form input fields
      projectname.value = "";
      assignedUser.value = "";
      projectdescription.value = "";
      datecreated.value = "";
      projectdeadline.value = "";
    }
  });
}

function loadProjectsFromLocalStorage() {
  const projectsString = localStorage.getItem("projects");
  if (projectsString) {
    Projects = JSON.parse(projectsString);
  }
}

class ProjectActions {
  private projects: Project[];

  constructor() {
    this.projects = this.loadProjectsFromLocalStorage();
    document.addEventListener("DOMContentLoaded", () =>
      this.createAndDisplayTable()
    );
  }

  private loadProjectsFromLocalStorage(): Project[] {
    const projectsString = localStorage.getItem("projects");
    return projectsString ? JSON.parse(projectsString) : [];
  }

  public addProject(project: Project) {
    this.projects.push(project);
    localStorage.setItem("projects", JSON.stringify(this.projects));
    this.createAndDisplayTable(); // Refresh the project list display
  }

  public createAndDisplayTable() {
    const container = document.querySelector(".table-wrapper") as HTMLElement;
    if (!container) {
      console.error("No Such Container");
      return;
    }

    // Clear existing table content (if any)
    container.innerHTML = "";

    const table = document.createElement("table");
    table.setAttribute("class", "projects-table");

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>#</th>
        <th>User Assigned</th>
        <th>Project</th>
        <th>Description</th>
        <th>Created Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>ACTIONS</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("class", "projectRecords");
    this.projects.forEach((project, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${project.projectId}</td>
        <td>${project.assignedUser}</td>
        <td>${project.projectname}</td>
        <td>${project.description}</td>
        <td>${project.createDate}</td>
        <td>${project.deadLine}</td>
        <td>Active</td>
        <td>
          <div class="actions">
            <a href="#" class="delete-action" data-project-id="${project.projectId}"><span class="fa fa-trash" "></span></a>
            <a href="../Admin/projectview.html"><span class="las la-eye"></span></a>
            <a href="../Admin/Forms/editproject.html?projectId=${project.projectId}"><span style="font-size: 18px" class="fa-regular fa-pen-to-square"></span></a>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);

    this.addDeleteEventListeners();
  }

  private addDeleteEventListeners() {
    document.querySelectorAll(".delete-action").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const projectId = parseInt(
          (e.target as HTMLElement)
            .closest(".delete-action")!
            .getAttribute("data-project-id")!,
          10
        );
        this.removeProjectFromLocalStorage(projectId);
      });
    });
  }

  private removeProjectFromLocalStorage(projectId: number) {
    this.projects = this.projects.filter(
      (project) => project.projectId !== projectId
    );
    localStorage.setItem("projects", JSON.stringify(this.projects));
    this.createAndDisplayTable(); // Refresh the project list display
  }
}

const projectActions = new ProjectActions();

document.addEventListener("DOMContentLoaded", () => {
  projectActions.createAndDisplayTable();
});
