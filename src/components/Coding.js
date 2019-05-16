import React, { Component } from 'react';



class Coding extends Component {

    state = {
        password: '',
        message: '',
        email: '',
        correct: false,
        messageSend: '',

        errors: {
            password: false,
            passwordToShort: false,
            message: false,
            email: false
        }
    }

    messages = {
        password_error: 'The key is too short',
        password_error2: 'The key is too long',
        message_error: 'The text is too long',
        email_error: 'Check if the mail is correct'
    }

    handleChange = event => {

        const id = event.target.id
        const value = event.target.value

        this.setState({
            [id]: value
        })
    }

    handleResetAll = () => {
        this.setState({
            password: '',
            message: '',
            email: '',
            correct: false,
            messageSend: '',

            errors: {
                password: false,
                passwordToShort: false,
                message: false,
                email: false
            }
        })
    }

    messageToCode = () => {
        let message = this.state.message
        let key = this.state.password.length
        let codeMessage = ''

        let newMessage = message.toUpperCase().replace(/Ą/g, 'A').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z')

        codeMessage = newMessage.replace(/[A-Z]/g, imput => String.fromCharCode((imput.charCodeAt(0) - 65 + key) % 26 + 65));

        this.setState({
            message: codeMessage
        })
    }

    codeToMessage = () => {
        let message = this.state.message
        let key = this.state.password.length - (this.state.password.length * 2)
        let noCodeMessage = ''

        noCodeMessage = (message, key) => {
            if (key < 0)
                return noCodeMessage(message, key + 26);
            let output = '';
            for (let i = 0; i < message.length; i++) {
                let c = message[i];
                if (c.match(/[A-Z]/)) {
                    let code = message.charCodeAt(i);
                    if ((code >= 65) && (code <= 90))
                        c = String.fromCharCode(((code - 65 + key) % 26) + 65);
                    else if ((code >= 97) && (code <= 122))
                        c = String.fromCharCode(((code - 97 + key) % 26) + 97);
                }
                output += c
            }
            return output;
        };
        this.setState({
            message: noCodeMessage
        })

    }

    formValidation = () => {
        let password = false;
        let passwordToShort = false;
        let message = false;
        let email = false;
        let correct = false;

        if (this.state.password.length > 0 && this.state.password.length < 4) {
            password = true;
            passwordToShort = true;
        }
        if (this.state.password.length >= 25) {
            password = true;
        }
        if (this.state.message.length > 51) {
            message = true
        }
        if (this.state.email.length > 7 && this.state.email.indexOf('@') !== -1) {
            email = true
        }
        if (password && message && email) {
            correct = true
        }

        return ({
            password,
            passwordToShort,
            message,
            email,
            correct,
        })

        // if (input.value.length > 0 && input.value.length < 4) {
        //     document.querySelector('div.keyInfo').textContent = "The key is too short"
        // } else if ((input.value.length > 4 && input.value.length < 25) || (input.value.length == 0)) {
        //     document.querySelector('div.keyInfo').textContent = ""
        // } else if (input.value.length >= 25) {
        //     document.querySelector('div.keyInfo').textContent = "The key is too long"
        // }

    }

    handleSubmit = event => {
        event.preventDefault()

        const validation = this.formValidation()

        if (validation.correct) {
            this.setState({
                password: "",
                passwordToShort: false,
                message: "",
                email: '',
                correct: false,
                messageSend: 'Success! Message was sent',

                errors: {
                    password: false,
                    passwordToShort: false,
                    message: false,
                    email: false
                }

            })

        } else {
            this.setState({
                errors: {
                    password: !validation.password,
                    passwordToShort: !validation.passwordToShort,
                    message: !validation.message,
                    email: !validation.email
                }
            })
        }

    }

    componentDidUpdate() {
        if (this.state.message !== '') {
            setTimeout(() => {
                this.setState({
                    message: ''
                })
            }, 3000)
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="container">
                    <div class="marginTop">




                        <div class="row">
                            <div class="col col-lg-2 aaa">
                                <label for="exampleInputPassword1" className="margin">Enter the key:</label>
                            </div>

                            <div class="col col-md-4">

                                <input type="password" class="form-control margin is-valid" id="password" aria-describedby="inputGroupPrepend3" required value={this.state.password} onChange={this.handleChange} />
                                <div class="invalid-feedback margin2">
                                    Please choose a username.
                                </div>
                            </div>

                            <div class="col col-lg-2">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col col-lg-2 aaa">
                                <label for="exampleFormControlTextarea1" className="margin">Message:</label>
                            </div>

                            <div class="col col-md-4">
                                <textarea class="form-control margin is-valid" id="message" rows="5" aria-describedby="inputGroupPrepend3" required value={this.state.message} onChange={this.handleChange} />
                                <div class="invalid-feedback margin2">
                                    Please choose a username.
                                </div>
                            </div>


                            <div class="col col-lg-2 margin">
                                <button
                                    type="button"
                                    class="btn btn-outline-primary btnBreak2"
                                    onClick={this.messageToCode}
                                >Encryption</button>
                                <button
                                    type="button"
                                    class="btn btn-outline-primary btnBreak"
                                    onClick={this.codeToMessage}
                                >Decryption</button>
                                <button
                                    type="button"
                                    class="btn btn-outline-primary btnBreak2"
                                    onClick={this.handleResetAll}
                                >Reset</button>
                            </div>

                        </div>



                        <div class="row">
                            <div class="col col-lg-2 aaa">
                                <label for="exampleInputEmail1" className="margin">E-mail:</label>
                            </div>

                            <div class="col col-md-4">
                                <input type="email" class="form-control margin is-valid" id="email" aria-describedby="emailHelp" placeholder="Send a message to your friend" value={this.state.email} onChange={this.handleChange} />

                                <div class="invalid-feedback margin2">
                                    Please choose a username.
                                </div>
                            </div>

                            <div class="col col-lg-2">
                                <button class="btn btn-outline-primary btnBreak2" type="submit">Send</button>
                            </div>

                        </div>




                    </div>
                </div>
            </form>
        );
    }
}

export default Coding;