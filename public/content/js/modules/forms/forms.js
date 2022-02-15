//? check input one by on one
export const chkInp = (regexPattern, val) => {
    if (regexPattern.test(val)) 
        return true
    else 
        return false
}

//? set erorr messages for elements
export const setErrorFor = (elm, errMsg) => {
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
export const setSuccessFor = (elm, successMsg) => {
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