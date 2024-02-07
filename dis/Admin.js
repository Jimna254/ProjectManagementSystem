"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const toastr = __importStar(require("toastr"));
toastr.options = {
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
let createProjectForm = document.querySelector(".createProjectForm");
let projectname = document.querySelector("#projectName");
let assignedUser = document.querySelector("#userAssign");
let projectdescription = document.querySelector("#description");
let datecreated = document.querySelector("#createDate");
let projectdeadline = document.querySelector("#enddate");
let Projects = [];
createProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let project = projectname.value.trim() != "" &&
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
    }
    else {
        toastr.error("Please fill all the required details");
    }
});
//Displaying projects from Local Storage to HTML
