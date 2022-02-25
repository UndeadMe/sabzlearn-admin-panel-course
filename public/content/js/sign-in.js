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

const fetchData = async (url, headerSetting) => {
    const response = await fetch(url, headerSetting)
    const responseJson = await response.json()
    return responseJson
}

//? submit and fetch data
const submit = async () => {
    const headerSetting = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
        redirect: 'follow'
    }
    try {
        const { access, refresh } = fetchData("http://127.0.0.1:8000/user/login/", headerSetting)

        if (responseJson.detail === "No active account found with the given credentials")
            throw new Error(responseJson.detail[0])
            
        store_JWT_tokenInCookie(access, refresh)
    } catch (err) {
        fireSwalErr("sorry", `${err.message}`)
    }
}

const store_JWT_tokenInCookie = (access, refresh) => {
    document.cookie = `access_token = ${access}`
    document.cookie = `refresh_token = ${refresh}`
    console.log("cookie setted")

    // get all cookie with this command
    // document.cookie.split(";").map(cookie => cookie.split("="))
}

usernameInput.addEventListener("keyup", (e) => validateInputs(e.target, /^[a-zA-Z0-9]+$/, "successful", "Please don't use any special charachters"))
passwordInput.addEventListener("keyup", (e) => validateInputs(e.target, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "successful", "Please enter your password correctly"))

const fireSwalErr = (title, errMsg) => {
    Swal.fire({
      icon: "error",
      title: `${title}`,
      text: `${errMsg}`
    })
  }

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    if (validateAllInputs()) {
        submitFormBtn.disabled = false
        submit()
    } else 
        submitFormBtn.disabled = true
})

eyeElem.addEventListener("click", () => eye.checkEye())