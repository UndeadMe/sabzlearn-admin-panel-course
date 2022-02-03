import { Eye } from "../../components/eye-input/eye-input.js"

const eyeElem = document.querySelector(".eye")
const inputElements = [...document.querySelectorAll('.verify-input')]
const verifySubmit = document.getElementById("verifySubmitBtn")

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

verifySubmit.addEventListener("click", (e) => verify(e))