import React, { Component } from 'react';
import Footer from './Footer'

class Coding extends Component {

    state = {
        password: '',
        message: '',
        email: '',
        correct: false,

        errors: {
            password: false,
            passwordToShort: false,
            message: false,
            messageToShort: false,
            email: false,
        }
    }

    messages = {
        password_error: 'The key is too short',
        password_error2: 'The key is too long',
        message_error: 'The text is too short',
        message_error2: 'The text is too long',
        email_error: 'Check if the mail is correct',
        message_send: 'Success! Message was sent'
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
                messageToShort: false,
                email: false
            }
        })
    }

    messageToCode = () => {
        let key = this.state.password.length
        let message = this.state.message

        let newMessage = message.toUpperCase().replace(/Ą/g, 'A').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z')

        let codeMessage = newMessage.replace(/[A-Z]/g, imput => String.fromCharCode((imput.charCodeAt(0) - 65 + key) % 26 + 65));

        this.setState({
            message: codeMessage
        })
    }

    handleCodeToMessage = () => {
        let key = this.state.password.length - (this.state.password.length * 2)
        let message = this.state.message

        const noCodeMessage = (message, key) => {
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

        let codeToMessage = noCodeMessage(message, key)

        this.setState({
            message: codeToMessage
        })

    }

    CodeValidation = () => {

        let password = false
        let passwordToShort = false
        let message = false
        let messageToShort = false
        let correct = false

        if (this.state.password.length > 4) {
            passwordToShort = true;
        }
        if (this.state.password.length <= 25) {
            password = true;
        }
        if (this.state.message.length < 51) {
            message = true
        }
        if (this.state.message.length > 4) {
            messageToShort = true
        }
        if (password && passwordToShort && message && messageToShort) {
            correct = true
        }

        return ({
            password,
            passwordToShort,
            message,
            messageToShort,
            correct
        })

    }

    handleCodeMessage = () => {

        const validation = this.CodeValidation()

        if (validation.correct) {

            this.messageToCode()

        } else {

            this.setState({
                errors: {
                    password: !validation.password,
                    passwordToShort: !validation.passwordToShort,
                    message: !validation.message,
                    messageToShort: !validation.messageToShort
                },
            })
        }
    }

    SendValidation = () => {
        let password = false
        let passwordToShort = false
        let message = false
        let messageToShort = false
        let email = false
        let correct = false

        if (this.state.password.length > 4) {
            passwordToShort = true;
        }
        if (this.state.password.length <= 25) {
            password = true;
        }
        if (this.state.message.length < 51) {
            message = true
        }
        if (this.state.message.length > 4) {
            messageToShort = true
        }
        if (this.state.email.length > 6 && this.state.email.indexOf('@') !== -1) {
            email = true
        }
        if (password && passwordToShort && message && messageToShort && email) {
            correct = true
        }

        return ({
            password,
            passwordToShort,
            message,
            messageToShort,
            email,
            correct
        })
    }

    handleSendMessage = event => {

        event.preventDefault()

        const validation = this.SendValidation()

        if (validation.correct) {
            this.setState({
                correct: true
            })

            setTimeout(this.handleResetAll, 2000)

        } else {
            this.setState({
                errors: {
                    password: !validation.password,
                    passwordToShort: !validation.passwordToShort,
                    message: !validation.message,
                    messageToShort: !validation.messageToShort,
                    email: !validation.email
                },
            })
        }
    }

    componentDidUpdate() {
        if (this.state.errors.password || this.state.errors.passwordToShort) {

            setTimeout(() => {
                this.setState({
                    errors: {
                        password: false,
                        passwordToShort: false
                    }
                })
            }, 2000)
        }
        if (this.state.errors.message || this.state.errors.messageToShort) {
            setTimeout(() => {
                this.setState({
                    errors: {
                        message: false,
                        messageToShort: false
                    }
                })
            }, 2000)
        }
        if (this.state.errors.email) {
            setTimeout(() => {
                this.setState({
                    errors: {
                        email: false
                    }
                })
            }, 2000)
        }
    }


    render() {

        let passwordStyle = 'form-control margin text-center'
        let messageStyle = 'form-control margin text-center'
        let emailStyle = 'form-control margin text-center'
        let emailFeedbackStyle = 'invalid-feedback margin2'

        if (this.state.errors.passwordToShort || this.state.errors.password) {
            passwordStyle = 'form-control margin3 text-center is-invalid'
        } else {
            passwordStyle = 'form-control margin text-center'
        }
        if (this.state.errors.messageToShort || this.state.errors.message) {
            messageStyle = 'form-control margin3 text-center is-invalid'
        } else {
            messageStyle = 'form-control margin text-center'
        }
        if (this.state.errors.email) {
            emailStyle = 'form-control margin3 text-center is-invalid'
        } else {
            emailStyle = 'form-control margin text-center'
        }
        if (this.state.correct) {
            emailFeedbackStyle = 'margin4 sendMessage'
        } else {
            emailFeedbackStyle = 'invalid-feedback margin2'
        }

        return (
            <form noValidate>
                <div className="container">
                    <div className="marginTop">

                        <div className="row">
                            <div className="col col-lg-2 text-right">
                                <label htmlFor="exampleInputPassword1" className="margin">Enter the key:</label>
                            </div>
                            <div className="col col-md-4">
                                <input
                                    type="password"
                                    className={passwordStyle}
                                    id="password"
                                    aria-describedby="inputGroupPrepend3" required
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <div className="margin2">
                                    {this.state.errors.password && <center>{this.messages.password_error2}</center>}

                                    {this.state.errors.passwordToShort && <center>{this.messages.password_error}</center>}
                                </div>
                            </div>
                            <div className="col col-lg-2">
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-lg-2 text-right">
                                <label htmlFor="exampleFormControlTextarea1" className="margin">Message:</label>
                            </div>
                            <div className="col col-md-4">
                                <textarea
                                    className={messageStyle}
                                    id="message" rows="5" aria-describedby="inputGroupPrepend3" required
                                    value={this.state.message}
                                    onChange={this.handleChange}
                                />
                                <div className="margin2">

                                    {this.state.errors.message && <center>{this.messages.message_error2}</center>}

                                    {this.state.errors.messageToShort && <center>{this.messages.message_error}</center>}

                                </div>
                            </div>


                            <div className="col col-lg-2 margin">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btnBreak2"
                                    onClick={this.handleCodeMessage}
                                >Encryption</button>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btnBreak"
                                    onClick={this.handleCodeToMessage}
                                >Decryption</button>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btnBreak2"
                                    onClick={this.handleResetAll}
                                >Reset</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col col-lg-2 text-right">
                                <label htmlFor="exampleInputEmail1" className="margin">E-mail:</label>
                            </div>
                            <div className="col col-md-4">
                                <input type="email"
                                    className={emailStyle}
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Send a message to your friend"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <div className={emailFeedbackStyle}>

                                    {this.state.errors.email && <center>{this.messages.email_error}</center>}

                                    {this.state.correct && <center>{this.messages.message_send}</center>}

                                </div>
                            </div>

                            <div className="col col-lg-2 margin mobile">
                                <button className="btn btn-outline-primary btnBreak3" type="submit" onClick={this.handleSendMessage}>Send</button>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer correct={this.state.correct} />
            </form>
        );
    }
}

export default Coding;