export class Eye {
    #openEyeCond = false
    #eye
    #input

    constructor(eyeClass, inputClass) {
        this.#eye = document.querySelector(eyeClass)
        this.#input = document.querySelector(inputClass)
    }

    #showValueOfInput() {
        this.#input.type = "text"
    }

    #dontShowValueOfInput() {
        this.#input.type = "password"
    }

    #closeEye() {
        this.#eye.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g id="vuesax_linear_eye-slash" data-name="vuesax/linear/eye-slash" transform="translate(-172 -188)"><g id="eye-slash"><path id="Vector" d="M6.11,1.05,1.05,6.11A3.578,3.578,0,1,1,6.11,1.05Z" transform="translate(180.42 196.42)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-2" data-name="Vector" d="M15.6,2.04A9.631,9.631,0,0,0,9.785,0C6.255,0,2.965,2.08.675,5.68a5.326,5.326,0,0,0,0,5.19,14.326,14.326,0,0,0,2.71,3.17" transform="translate(174.215 191.73)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-3" data-name="Vector" d="M0,11.6a9.215,9.215,0,0,0,3.58.74c3.53,0,6.82-2.08,9.11-5.68a5.326,5.326,0,0,0,0-5.19A16.222,16.222,0,0,0,11.63,0" transform="translate(180.42 195.93)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-4" data-name="Vector" d="M2.82,0A3.565,3.565,0,0,1,0,2.82" transform="translate(184.69 200.7)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-5" data-name="Vector" d="M7.47,0,0,7.47" transform="translate(174 202.53)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-6" data-name="Vector" d="M7.47,0,0,7.47" transform="translate(186.53 190)" fill="none" stroke="var(--main-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-7" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(196 212) rotate(180)" fill="none" opacity="0"/></g></g></svg>`
    }

    #openEye() {
        this.#eye.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g id="eye" transform="translate(-108 -188)"><path id="Vector" d="M7.16,3.58A3.58,3.58,0,1,1,3.58,0,3.576,3.576,0,0,1,7.16,3.58Z" transform="translate(116.42 196.42)" fill="none" stroke="var(--primary-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-2" data-name="Vector" d="M9.785,16.55c3.53,0,6.82-2.08,9.11-5.68a5.326,5.326,0,0,0,0-5.19C16.6,2.08,13.315,0,9.785,0S2.965,2.08.675,5.68a5.326,5.326,0,0,0,0,5.19C2.965,14.47,6.255,16.55,9.785,16.55Z" transform="translate(110.215 191.72)" fill="none" stroke="var(--primary-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path id="Vector-3" data-name="Vector" d="M0,0H24V24H0Z" transform="translate(132 212) rotate(180)" fill="none" opacity="0"/></g></svg>`
    }

    #changeEye(bool) {
        this.#openEyeCond = bool
    }

    checkEye() {
        if (this.#openEyeCond) {
            this.#dontShowValueOfInput()
            this.#openEye()
            this.#changeEye(false)
        } else {
            this.#showValueOfInput()
            this.#closeEye()
            this.#changeEye(true)
        }
    }
}