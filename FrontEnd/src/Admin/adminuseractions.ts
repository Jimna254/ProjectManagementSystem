let tcontainer = document.querySelector(".table-container") as HTMLDivElement;

window.onload = async () => {
  await getUsers();
};

let UsersArr: any[] = [];

async function getUsers() {
  try {
    let result = await fetch("http://localhost:3001/users", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        token: getTokener(),
      },
      method: "GET",
    });

    let users = await result.json();
    users.users.recordsets[0].forEach((user: any) => {
      UsersArr.push(user);
    });

    console.log(UsersArr);
    displayUsers();
  } catch (error) {}
}

function displayUsers() {
  if (UsersArr.length >= 1) {
    const container = document.querySelector(".table-container") as HTMLElement;
    if (!tcontainer) {
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
                <th>Name</th>
                <th>Email</th>
                <th>role</th>
                <th>AreaOfSpecialization</th>
                <th>isdeleted</th>
                <th>isWelcomed</th>
                <th>Actions</th>
              </tr>
            `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("class", "userRecords");
    UsersArr.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.user_id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.AreaOfSpecialization}</td>
                <td>${user.isdeleted}</td>
                <td>${user.isWelcomed}</td>
                
                
                <td>
                  <div class="actions">
                    <a href="#" class="delete-action" data-project-id="${user.user_id}"><span class="fa fa-trash" "></span></a>
                    <a href="../Admin/projectview.html"><span class="las la-eye"></span></a>
                    <a href="../Admin/Forms/editproject.html?projectId=${user.user_id}"><span style="font-size: 18px" class="fa-regular fa-pen-to-square"></span></a>
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

function getTokener() {
  let token = localStorage.getItem("token") as string;

  return JSON.parse(token);
}
