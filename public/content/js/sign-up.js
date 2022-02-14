import { Eye } from "../../components/eye-input/eye-input.js"

const eyeElem = document.querySelector(".eye")
const inputElements = [...document.querySelectorAll('.verify-input')]
const verifySubmit = document.getElementById("verifySubmitBtn")
const form = document.forms[1]
const usernameInput = form["username-input"]
const emailInput = form["email-input"]
const passwordInput = form["password-input"]
const submitFormBtn = form["submit-form-btn"]

const eye = new Eye(".eye", "#password-input")

inputElements.forEach((ele, index) => {
    ele.addEventListener('keydown',(e) => {
        // console.log(e.key)
        // if the keycode is backspace & the current field is empty
        // focus the input before the current. The event then happens
        // which will clear the input before the current
        if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
    })
    
    // input listener occurs when the value of input changed
    ele.addEventListener('input', (e) => {
        // take the first character of the input
        // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
        // but I'm willing to overlook insane security code practices.
        
        const [first,...rest] = e.target.value

        e.target.value = first ?? '' // the `??` '' is for the backspace usecase
        const lastInputBox = index === inputElements.length-1
        const insertedContent = first !== undefined
        if (insertedContent && !lastInputBox) {
            // continue to input the rest of the string
            inputElements[index+1].focus()
            inputElements[index+1].value = rest.join('')
            inputElements[index+1].dispatchEvent(new Event('input'))
        }
    })
})

//? verify code email
const verify = (e) => {
    e.preventDefault()
    const code = [...document.querySelectorAll('.verify-input')].map(input => input.value).join('')
    console.log(code)
}

const chkInp = (regexPattern, val) => {
    if (regexPattern.test(val)) 
        return true
    else 
        return false
}

//? check and validate inputs
const validateInputs = (inpElm, regexPattern, successMsg, errMsg) => {
    const regexTest = regexPattern.test(inpElm.value)
    if (regexTest) {
        setSuccessFor(inpElm, successMsg)

        if (checkAllInputs())
            submitFormBtn.disabled = false
        else
            submitFormBtn.disabled = true
        
        return true
    } else {
        setErrorFor(inpElm, errMsg)
        submitFormBtn.disabled = true
        return false
    }
}

//? check and validate all inputs
const checkAllInputs = () => {
    const username = chkInp(/^[a-zA-Z0-9]+$/, usernameInput.value)
    const email = chkInp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, emailInput.value)
    const password = chkInp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, passwordInput.value)

    const checked = [ username, email, password ].every(x => x)
    
    return checked
}

//? validate all inputs
const validateAllInputs = () => {
    const username = validateInputs(usernameInput, /^[a-zA-Z0-9]+$/, "successful", "Please don't use any special charachters")
    const email = validateInputs(emailInput, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "successful", "Your email is not powerful")
    const password = validateInputs(passwordInput, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "successful", "Please enter your email correctly")

    const checked = [ username, email, password ].every(x => x)

    return checked
}

//? set erorr messages for elements
const setErrorFor = (elm, errMsg) => {
    //? get parent of input element { elm }
    const parentElm = elm.parentElement

    //? set classes of parent element
    parentElm.classList.remove("valid")
    parentElm.classList.add("invalid")

    //? get message element by { elm }
    const messageElm = parentElm.nextElementSibling
    
    //? empty innerHTML of that
    messageElm.innerHTML = ""

    //? set classes of message element
    messageElm.classList.remove("valid-message")
    messageElm.classList.add("invalid-message")
    
    //? put invalid { errMsg } in that
    messageElm.insertAdjacentHTML("beforeend", `
        <span class="invalid-message-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g id="vuesax_linear_warning-2" data-name="vuesax/linear/warning-2" transform="translate(-172 -700)"><g id="warning-2"><path id="Vector" d="M0,0V5.25" transform="translate(184 707.75)" fill="none" stroke="var(--red)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-2" data-name="Vector" d="M18.17,6.58v6.84a3.174,3.174,0,0,1-1.57,2.73l-5.94,3.43a3.163,3.163,0,0,1-3.15,0L1.57,16.15A3.15,3.15,0,0,1,0,13.42V6.58A3.174,3.174,0,0,1,1.57,3.85L7.51.42a3.163,3.163,0,0,1,3.15,0L16.6,3.85A3.162,3.162,0,0,1,18.17,6.58Z" transform="translate(174.91 702)" fill="none" stroke="var(--red)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-3" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(172 700)" fill="none" opacity="0"/><path id="Vector-4" data-name="Vector" d="M0,0V.1" transform="translate(184 716.2)" fill="none" stroke="var(--red)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g></g></svg>
        </span>
        <span class="invalid-message-text">${errMsg}</span>`
    )
}

//? set success messages for elements
const setSuccessFor = (elm, successMsg) => {
    //? get parent of input element { elm }
    const parentElm = elm.parentElement
    
    //? set classes of parent element
    parentElm.classList.remove("invalid")
    parentElm.classList.add("valid")

    //? get message element by { elm }
    const messageElm = parentElm.nextElementSibling
    
    //? empty innerHTML of that
    messageElm.innerHTML = ""

    //? set classes of message element
    messageElm.classList.remove("invalid-message")
    messageElm.classList.add("valid-message")
    
    //? put invalid { successMsg } in that
    messageElm.insertAdjacentHTML("beforeend", `
        <span class="invalid-message-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g id="vuesax_linear_warning-2" data-name="vuesax/linear/warning-2" transform="translate(-172 -700)"><g id="warning-2"><path id="Vector" d="M18.17,6.58v6.84a3.174,3.174,0,0,1-1.57,2.73l-5.94,3.43a3.163,3.163,0,0,1-3.15,0L1.57,16.15A3.15,3.15,0,0,1,0,13.42V6.58A3.174,3.174,0,0,1,1.57,3.85L7.51.42a3.163,3.163,0,0,1,3.15,0L16.6,3.85A3.162,3.162,0,0,1,18.17,6.58Z" transform="translate(174.5 702.5)" fill="none" stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-2" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(172 700)" fill="none" opacity="0"/><path id="Vector-3" data-name="Vector" d="M0,2.83,2.83,5.66,8.5,0" transform="translate(179.75 709.67)" fill="none" stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></g></g></svg>
        </span>
        <span class="invalid-message-text">${successMsg}</span>`
    )
}

verifySubmit.addEventListener("click", (e) => verify(e))
eyeElem.addEventListener("click", () => eye.checkEye())
usernameInput.addEventListener("keyup", (e) => validateInputs(e.target, /^[a-zA-Z0-9]+$/, "successful", "Please don't use any special charachters"))
emailInput.addEventListener("keyup", (e) => validateInputs(e.target, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "successful", "Your email is not powerful"))
passwordInput.addEventListener("keyup", (e) => validateInputs(e.target, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "successful", "Please enter your email correctly"))

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    if (validateAllInputs())
        submitFormBtn.disabled = false
    else 
        submitFormBtn.disabled = true
})