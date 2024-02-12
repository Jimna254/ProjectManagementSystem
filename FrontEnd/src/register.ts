const reg_form = document.querySelector("formcontainer") as HTMLFormElement

const user_name = document.getElementById("name") as HTMLInputElement
const user_email = document.getElementById("email") as HTMLInputElement
const user_phone_number = document.getElementById("phone_number") as HTMLInputElement
const user_role = document.getElementById("role") as HTMLSelectElement
const user_location = document.getElementById("location") as HTMLInputElement
const user_Password = document.getElementById("Password") as HTMLInputElement

let successmsg = document.querySelector('.success-msg') as HTMLParagraphElement