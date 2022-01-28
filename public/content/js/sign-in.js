import { Eye } from "../../components/eye-input/eye-input.js"

const eyeElem = document.querySelector(".eye")
const eye = new Eye(".eye", "#password-input")

eyeElem.addEventListener("click", () => eye.checkEye())