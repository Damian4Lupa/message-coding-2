import React, { Component } from "react";
import Footer from "./Footer";

class Coding extends Component {
  state = {
    password: "",
    message: "",
    email: "",
    allCorrect: false,
    correct: false,
    messageIsCoded: false,
    encryptionClicked: 0,
    decryptionClicked: 0,

    passwordValidation: false,
    messageValidation: false,
    codingValidation: false,
    emailValidation: false,

    //przebudować błędy: nie obiekt, ale każdy błąd jako osobna zmienna
    errors: {
      password: false,
      passwordToShort: false,
      message: false,
      messageToShort: false,
      messageIsCoded: false,
      email: false,
    },
  };

  messages = {
    password_error: "The key is too short",
    password_error2: "The key is too long",
    message_error: "The text is too short",
    message_error2: "The text is too long",
    messageIsCoded_error: "the message was not coded",
    email_error: "Check if the mail is correct",
    message_send: "Success! Message was sent",
  };

  componentDidUpdate(prevState) {
    let {
      password,
      passwordToShort,
      message,
      messageToShort,
      email,
      messageIsCoded,
    } = this.state.errors;

    // if (prevState.password != this.state.password) {

    // }

    if (password || passwordToShort) {
      setTimeout(() => {
        this.setState({
          errors: {
            password: false,
            passwordToShort: false,
          },
        });
      }, 2000);
    }
    if (message || messageToShort || messageIsCoded) {
      setTimeout(() => {
        this.setState({
          errors: {
            message: false,
            messageToShort: false,
            messageIsCoded: false,
          },
        });
      }, 2000);
    }
    if (email) {
      setTimeout(() => {
        this.setState({
          errors: {
            email: false,
          },
        });
      }, 2000);
    }
  }

  handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      [id]: value,
    });
  };

  //! funkcje do przycisków
  //po kliknięciu Encryption
  handleEncryption = () => {
    let { passwordValidation, messageValidation } = this.state;

    this.passwordValidation();
    this.messageValidation();

    if (passwordValidation && messageValidation) {
      console.log("zakodowałem");
      this.codeMessage();
    }
  };

  //po kliknięciu Decryption
  handleDecryption = () => {
    let { message, decryptionClicked, password } = this.state;
    let key = password.length - password.length * 2;

    const noCodeMessage = (message, key) => {
      if (key < 0) return noCodeMessage(message, key + 26);
      let output = "";
      for (let i = 0; i < message.length; i++) {
        let c = message[i];
        if (c.match(/[A-Z]/)) {
          let code = message.charCodeAt(i);
          if (code >= 65 && code <= 90)
            c = String.fromCharCode(((code - 65 + key) % 26) + 65);
          else if (code >= 97 && code <= 122)
            c = String.fromCharCode(((code - 97 + key) % 26) + 97);
        }
        output += c;
      }
      return output;
    };

    let codeToMessage = noCodeMessage(message, key);

    this.setState({
      message: codeToMessage,
      decryptionClicked: decryptionClicked + 1,
    });
  };

  //po kliknięciu reset
  handleReset = () => {
    this.setState({
      password: "",
      message: "",
      email: "",
      correct: false,
      messageIsCoded: false,
      encryptionClicked: 0,
      decryptionClicked: 0,
      errors: {
        password: false,
        passwordToShort: false,
        message: false,
        messageToShort: false,
        email: false,
        messageIsCoded: false,
      },
    });
  };

  // po kliknięciu send
  handleSend = (event) => {
    this.ValidationToSendEmail(event);

    if (this.state.correct) {
      console.log("wiadomość wysłana");
    }

    //!odpowiada tylko za wysłanie wiadomości
  };

  //! pozostałe
  //kodowanie wiadomości
  codeMessage = () => {
    let { message, encryptionClicked, password } = this.state;
    let key = password.length;

    let newMessage = message
      .toUpperCase()
      .replace(/Ą/g, "A")
      .replace(/Ć/g, "C")
      .replace(/Ę/g, "E")
      .replace(/Ł/g, "L")
      .replace(/Ń/g, "N")
      .replace(/Ó/g, "O")
      .replace(/Ś/g, "S")
      .replace(/Ż/g, "Z")
      .replace(/Ź/g, "Z");

    let codeMessage = newMessage.replace(/[A-Z]/g, (imput) =>
      String.fromCharCode(((imput.charCodeAt(0) - 65 + key) % 26) + 65)
    );

    this.setState({
      message: codeMessage,
      encryptionClicked: encryptionClicked + 1,
    });
  };

  passwordValidation = () => {
    let password = false;
    let passwordToShort = false;

    if (this.state.password.length < 4) {
      passwordToShort = true;
    }
    if (this.state.password.length >= 25) {
      password = true;
    }

    if (password || passwordToShort) {
      this.setState({
        errors: {
          password,
          passwordToShort,
        },
      });
    }

    if (!password && !passwordToShort) {
      this.setState({
        passwordValidation: true,
      });
    }
  };

  messageValidation = () => {
    let message = false;
    let messageToShort = false;

    if (this.state.message.length > 51) {
      message = true;
    }
    if (this.state.message.length < 4) {
      messageToShort = true;
    }

    if (message || messageToShort) {
      this.setState({
        errors: {
          message,
          messageToShort,
        },
      });
    }

    if (!message && !messageToShort) {
      this.setState({
        messageValidation: true,
      });
    }
  };

  //sprawdza czy jest zakodowana
  codingValidation = () => {
    let { encryptionClicked, decryptionClicked } = this.state;

    if (encryptionClicked !== decryptionClicked) {
      this.setState({
        errors: {
          messageIsCoded: true,
        },
      });
    } else {
      this.setState({
        codingValidation: true,
      });
    }
  };

  emailValidation = () => {
    if (
      this.state.email.length > 6 &&
      this.state.email.indexOf("@") !== -1 &&
      this.state.email.indexOf(".") !== -1
    ) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        errors: {
          email: true,
        },
      });
    }
  };

  //!stare funkcje
  CodeValidation = () => {
    let password = false;
    let passwordToShort = false;
    let message = false;
    let messageToShort = false;
    let correct = false;

    if (this.state.password.length > 4) {
      passwordToShort = true;
    }
    if (this.state.password.length <= 25) {
      password = true;
    }
    if (this.state.message.length < 51) {
      message = true;
    }
    if (this.state.message.length > 4) {
      messageToShort = true;
    }
    if (password && passwordToShort && message && messageToShort) {
      correct = true;
    }

    return {
      password,
      passwordToShort,
      message,
      messageToShort,
      correct,
    };
  };

  SendValidation = () => {
    let password = false;
    let passwordToShort = false;
    let message = false;
    let messageToShort = false;
    let email = false;
    let correct = false;

    if (this.state.password.length > 4) {
      passwordToShort = true;
    }
    if (this.state.password.length <= 25) {
      password = true;
    }
    if (this.state.message.length < 51) {
      message = true;
    }
    if (this.state.message.length > 4) {
      messageToShort = true;
    }
    if (
      this.state.email.length > 6 &&
      this.state.email.indexOf("@") !== -1 &&
      this.state.email.indexOf(".") !== -1
    ) {
      email = true;
    }
    if (password && passwordToShort && message && messageToShort && email) {
      correct = true;
    }

    return {
      password,
      passwordToShort,
      message,
      messageToShort,
      email,
      correct,
    };
  };

  ValidationToSendEmail = (event) => {
    event.preventDefault();

    const validation = this.SendValidation();

    if (validation.correct) {
      this.setState({
        correct: true,
      });

      setTimeout(this.handleReset, 10000);
    } else {
      this.setState({
        errors: {
          password: !validation.password,
          passwordToShort: !validation.passwordToShort,
          message: !validation.message,
          messageToShort: !validation.messageToShort,
          email: !validation.email,
          messageIsCoded: !validation.messageIsCoded,
        },
      });
    }
  };

  messageIsCodedValidation = () => {
    let { encryptionClicked, decryptionClicked } = this.state;

    if (encryptionClicked !== decryptionClicked) {
      this.setState({
        messageIsCoded: true,
        errors: {
          messageIsCoded: false,
        },
      });
    } else {
      this.setState({
        messageIsCoded: false,
        errors: {
          messageIsCoded: true,
        },
      });
    }
  };

  render() {
    // console.log("message", this.state.message)
    // console.log("encryptionClicked", this.state.encryptionClicked);
    // console.log("decryptionClicked", this.state.decryptionClicked);
    // console.log("correct", this.state.correct);

    let passwordStyle = "form-control margin text-center";
    let messageStyle = "form-control margin text-center";
    let emailStyle = "form-control margin text-center";
    let emailFeedbackStyle = "invalid-feedback margin2";

    if (this.state.errors.passwordToShort || this.state.errors.password) {
      passwordStyle = "form-control margin3 text-center is-invalid";
    } else {
      passwordStyle = "form-control margin text-center";
    }
    if (this.state.errors.messageToShort || this.state.errors.message) {
      messageStyle = "form-control margin3 text-center is-invalid";
    } else {
      messageStyle = "form-control margin text-center";
    }
    if (this.state.errors.email) {
      emailStyle = "form-control margin3 text-center is-invalid";
    } else {
      emailStyle = "form-control margin text-center";
    }
    if (this.state.correct) {
      emailFeedbackStyle = "margin4 sendMessage";
    } else {
      emailFeedbackStyle = "invalid-feedback margin2";
    }

    let passwordErrorTooShort = this.state.errors.passwordToShort && (
      <center>{this.messages.password_error}</center>
    );
    let passwordErrorTooLong = this.state.errors.password && (
      <center>{this.messages.password_error2}</center>
    );
    let messageErrorTooShort = this.state.errors.messageToShort && (
      <center>{this.messages.message_error}</center>
    );
    let messageErroTooLong = this.state.errors.message && (
      <center>{this.messages.message_error2}</center>
    );
    let messageErrorNotCoded = this.state.errors.messageIsCoded && (
      <center>{this.messages.messageIsCoded_error}</center>
    );
    let emailIsInvalid = this.state.errors.email && (
      <center>{this.messages.email_error}</center>
    );
    let messageSend = this.state.correct && (
      <center>{this.messages.message_send}</center>
    );

    return (
      <form noValidate>
        <div className="container">
          <main className="marginTop">
            <div className="row">
              <section className="col col-lg-2 text-right">
                <label htmlFor="exampleInputPassword1" className="margin">
                  Enter the key:
                </label>
              </section>
              <section className="col col-md-4">
                <input
                  type="password"
                  className={passwordStyle}
                  id="password"
                  aria-describedby="inputGroupPrepend3"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="margin2">
                  {passwordErrorTooShort}
                  {passwordErrorTooLong}
                </div>
              </section>
              <div className="col col-lg-2"></div>
            </div>

            <section className="row">
              <div className="col col-lg-2 text-right">
                <label htmlFor="exampleFormControlTextarea1" className="margin">
                  Message:
                </label>
              </div>
              <div className="col col-md-4">
                <textarea
                  className={messageStyle}
                  id="message"
                  rows="5"
                  aria-describedby="inputGroupPrepend3"
                  required
                  value={this.state.message}
                  onChange={this.handleChange}
                />
                <div className="margin2">
                  {messageErrorTooShort}
                  {messageErroTooLong}
                  {messageErrorNotCoded}
                </div>
              </div>

              <div className="col col-lg-2 margin">
                <button
                  type="button"
                  className="btn btn-outline-primary btnBreak2"
                  onClick={this.handleEncryption}
                >
                  Encryption
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btnBreak"
                  onClick={this.handleDecryption}
                >
                  Decryption
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btnBreak2"
                  onClick={this.handleReset}
                >
                  Reset
                </button>
              </div>
            </section>

            <section className="row">
              <div className="col col-lg-2 text-right">
                <label htmlFor="exampleInputEmail1" className="margin">
                  E-mail:
                </label>
              </div>
              <div className="col col-md-4">
                <input
                  type="email"
                  className={emailStyle}
                  id="email"
                  required
                  aria-describedby="emailHelp"
                  placeholder="Send a message to your friend"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div className={emailFeedbackStyle}>
                  {emailIsInvalid}
                  {messageSend}
                </div>
              </div>

              <div className="col col-lg-2 margin mobile">
                <button
                  className="btn btn-outline-primary btnBreak3"
                  type="submit"
                  onClick={this.handleSend}
                >
                  Send
                </button>
              </div>
            </section>
          </main>
        </div>
        <Footer correct={this.state.correct} />
      </form>
    );
  }
}

export default Coding;
