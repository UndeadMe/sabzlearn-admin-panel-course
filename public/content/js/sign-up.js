import { Eye } from "../../components/eye-input/eye-input.js"
import * as bundle from "./modules/forms/forms.js"

const eyeElem = document.querySelector(".eye")
const inputElements = [...document.querySelectorAll(".verify-input")]
const verifySubmit = document.getElementById("verifySubmitBtn")
const form = document.forms[1]
const usernameInput = form["username-input"]
const emailInput = form["email-input"]
const passwordInput = form["password-input"]
const submitFormBtn = form["submit-form-btn"]
const verifyCodeWrap = document.querySelector(".verify-code-wrap")
const resendText = document.querySelector(".resend-text")
const verifyCodeErrMsg = document.querySelector(".verify-code-error-msg")

const eye = new Eye(".eye", "#password-input")

inputElements.forEach((ele, index) => {
  ele.addEventListener("keydown", e => {
    // console.log(e.key)
    // if the keycode is backspace & the current field is empty
    // focus the input before the current. The event then happens
    // which will clear the input before the current
    if (e.keyCode === 8 && e.target.value === "")
      inputElements[Math.max(0, index - 1)].focus()
  })

  // input listener occurs when the value of input changed
  ele.addEventListener("input", e => {
    // take the first character of the input
    // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
    // but I'm willing to overlook insane security code practices.

    const [first, ...rest] = e.target.value

    e.target.value = first ?? "" // the `??` '' is for the backspace usecase
    const lastInputBox = index === inputElements.length - 1
    const insertedContent = first !== undefined
    if (insertedContent && !lastInputBox) {
      // continue to input the rest of the string
      inputElements[index + 1].focus()
      inputElements[index + 1].value = rest.join("")
      inputElements[index + 1].dispatchEvent(new Event("input"))
    }
  })
})

//? check and validate all inputs
const checkAllInputs = () => {
  const username = bundle.chkInp(/^[a-zA-Z0-9]+$/, usernameInput.value)
  const email = bundle.chkInp(
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    emailInput.value
  )
  const password = bundle.chkInp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    passwordInput.value
  )

  const checked = [username, email, password].every(x => x)

  return checked
}

//? validate all inputs
const validateAllInputs = () => {
  const username = validateInputs(
    usernameInput,
    /^[a-zA-Z0-9]+$/,
    "successful",
    "Please don't use any special charachters"
  )
  const email = validateInputs(
    emailInput,
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    "successful",
    "Your email is not powerful"
  )
  const password = validateInputs(
    passwordInput,
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "successful",
    "Please enter your password correctly"
  )

  const checked = [username, email, password].every(x => x)

  return checked
}

//? check and validate inputs
const validateInputs = (inpElm, regexPattern, successMsg, errMsg) => {
  const regexTest = regexPattern.test(inpElm.value)
  if (regexTest) {
    bundle.setSuccessFor(inpElm, successMsg)

    if (checkAllInputs()) submitFormBtn.disabled = false
    else submitFormBtn.disabled = true

    return true
  } else {
    bundle.setErrorFor(inpElm, errMsg)
    submitFormBtn.disabled = true
    return false
  }
}

//? fetch data function
const fetchData = async (url, headerSetting) => {
  const response = await fetch(url, headerSetting)
  const responseJson = await response.json()
  return responseJson
}

//? submit and fetch data
const submit = async () => {
  const headerSetting = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }),
    redirect: "follow"
  }

  try {
    const response = await fetchData(
      "http://127.0.0.1:8000/user/register/code/",
      headerSetting
    )

    if (response.detail === "ok") {
      console.log(`sign up information situation: ${response.detail}`)
      verifyCodeWrap.classList.add("active")
      verifyTimer(1, 20)
    } else throw new Error(response.detail)
  } catch (err) {
    fireSwalErr("sorry", `${err.message} please try other username and email `)
  }
}

const fireSwalErr = (title, errMsg) => {
  Swal.fire({
    icon: "error",
    title: `${title}`,
    text: `${errMsg}`
  })
}

let isEndTimer = false
let timer
//? verify code email timer
const verifyTimer = (minutTime, secondTime) => {
  isEndTimer = false
  let minut = minutTime
  let seconds = secondTime

  timer = setInterval(() => {
    if (seconds.toString().length === 1)
      resendText.innerHTML = `Resend the code until another 0${minut}:0${seconds}`
    else
      resendText.innerHTML = `Resend the code until another 0${minut}:${seconds}`

    if (verifyCodeWrap.classList.contains("active")) {
      if (seconds === 0) {
        if (seconds === 0 && minut === 0) {
          clearInterval(timer)
          minut = 0
          seconds = 0
  
          resendText.innerHTML = ""
          resendText.append(createResendCodeAgainText())
  
          isEndTimer = true
        } else {
          minut--
          seconds = 60
        }
      } else seconds--
    }
  }, 1000)
}

//? create resend verify code text
const createResendCodeAgainText = () => {
  const span = document.createElement("span")
  span.classList.add("resend-code-again-text")
  span.addEventListener("click", e => {
    verifyCodeErrMsg.innerHTML = ""
    e.target.innerHTML = ""
    submit()
  })
  span.innerHTML = "Resend code again"
  return span
}

//? verify code email
const verify = async e => {
  e.preventDefault()
  const code = [...document.querySelectorAll(".verify-input")]
    .map(input => input.value)
    .join("")

  if (!isEndTimer) sendEmailCodeAndVerifyEmail(code)
  else
    verifyCodeErrMsg.innerHTML = "Time is over, resend code again for yourself"
}

const sendEmailCodeAndVerifyEmail = async emailCode => {
  //? header setting
  const headerSetting = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code: emailCode }),
    redirect: "follow"
  }

  try {
    const response = await fetchData(
      "http://127.0.0.1:8000/user/register/",
      headerSetting
    )

    console.log(response)

    if (response.hasOwnProperty("detail"))
      location.assign("sign-in.html")
    else if (response.hasOwnProperty("code"))
      throw new Error(response.code[0])
    else if (response.hasOwnProperty("email"))
      throw new Error(response.email[0])
    else
      throw new Error(`${response.non_field_errors[0]}.`)

  } catch (err) {
    verifyCodeErrMsg.innerHTML = ""
    verifyCodeErrMsg.innerHTML = err.message
  }
}

verifySubmit.addEventListener("click", e => verify(e))
eyeElem.addEventListener("click", () => eye.checkEye())
usernameInput.addEventListener("keyup", e =>
  validateInputs(
    e.target,
    /^[a-zA-Z0-9]+$/,
    "successful",
    "Please don't use any special charachters"
  )
)
emailInput.addEventListener("keyup", e =>
  validateInputs(
    e.target,
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    "successful",
    "Your email is not powerful"
  )
)
passwordInput.addEventListener("keyup", e =>
  validateInputs(
    e.target,
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "successful",
    "Please enter your password correctly"
  )
)

form.addEventListener("submit", e => {
  e.preventDefault()

  if (validateAllInputs()) {
    submitFormBtn.disabled = false
    submit()
  } else submitFormBtn.disabled = true
})

verifyCodeWrap.addEventListener("click", (e) => {
  if (e.target.classList.contains("verify-code-wrap")) {
    clearInterval(timer)
    verifyCodeWrap.classList.remove("active")
    resendText.innerHTML = ""
    verifyCodeErrMsg.innerHTML = ""
    inputElements.forEach(inp => inp.value = "")
  }
})