import { Eye } from "../../components/eye-input/eye-input.js"
import * as bundle from "./modules/forms/forms.js"

const eyeElem = document.querySelector(".eye")
const form = document.forms[0]
const usernameInput = form["username-input"]
const passwordInput = form["password-input"]
const submitFormBtn = form["submit-form-btn"]
const eye = new Eye(".eye", "#password-input")


//? check and validate all inputs
const checkAllInputs = () => {
    const username = bundle.chkInp(/^[a-zA-Z0-9]+$/, usernameInput.value)
    const password = bundle.chkInp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, passwordInput.value)

    const checked = [ username, password ].every(x => x)
    
    return checked
}

//? validate all inputs
const validateAllInputs = () => {
    const username = validateInputs(usernameInput, /^[a-zA-Z0-9]+$/, "successful", "Please don't use any special charachters")
    const password = validateInputs(passwordInput, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "successful", "Please enter your email correctly")

    const checked = [ username, password ].every(x => x)

    return checked
}

//? check and validate inputs
const validateInputs = (inpElm, regexPattern, successMsg, errMsg) => {
    const regexTest = regexPattern.test(inpElm.value)
    if (regexTest) {
        bundle.setSuccessFor(inpElm, successMsg)

        if (checkAllInputs())
            submitFormBtn.disabled = false
        else
            submitFormBtn.disabled = true
        
        return true
    } else {
        bundle.setErrorFor(inpElm, errMsg)
        submitFormBtn.disabled = true
        return false
    }
}

usernameInput.addEventListener("keyup", (e) => validateInputs(e.target, /^[a-zA-Z0-9]+$/, "successful", "Please don't use any special charachters"))
passwordInput.addEventListener("keyup", (e) => validateInputs(e.target, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "successful", "Please enter your email correctly"))

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    if (validateAllInputs()) {
        submitFormBtn.disabled = false
    } else 
        submitFormBtn.disabled = true
})

eyeElem.addEventListener("click", () => eye.checkEye())