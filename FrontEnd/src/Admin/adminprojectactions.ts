let container = document.querySelector(".table-wrapper") as HTMLDivElement;

window.onload = async () => {
  await getProjects();
};

let projectsArr: any[] = [];

async function getProjects() {
  try {
    let result = await fetch("http://localhost:3001/projects", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: getToken(),
      },
      method: "GET",
    });

    let projects = await result.json();
    projects.projects.recordsets[0].forEach((project: any) => {
      projectsArr.push(project);
    });

    console.log(projectsArr);
    displayProjects();
  } catch (error) {}
}

function displayProjects() {
  if (projectsArr.length >= 1) {
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
                <th>Project</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>End Date</th>
                <th>isComplete</th>
                <th>UserIDassigned</th>
                <th>ACTIONS</th>
              </tr>
            `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("class", "projectRecords");
    projectsArr.forEach((project, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${project.project_id}</td>
                <td>${project.projectname}</td>
                <td>${project.description}</td>
                <td>${project.createdate}</td>
                <td>${project.enddate}</td>
                <td>${project.isComplete}</td>
                <td>${project.user_id}</td>
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
  } else {
    console.log("No projects");
  }
}

function getToken() {
  let token = localStorage.getItem("token") as string;

  return JSON.parse(token);
}
