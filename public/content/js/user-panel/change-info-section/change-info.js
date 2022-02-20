import { Eye } from "../../../../components/eye-input/eye-input.js"

const currentPassEyeElm = document.querySelector('.current-password-eye')
const newPassEyeElm = document.querySelector('.new-password-eye')

const currentPassEye = new Eye(".current-password-eye", "#current-password-input")
const newPassEye = new Eye(".new-password-eye", "#new-password-input")

currentPassEyeElm.addEventListener("click", () => currentPassEye.checkEye())
newPassEyeElm.addEventListener("click", () => newPassEye.checkEye())