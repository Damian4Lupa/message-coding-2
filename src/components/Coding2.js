import React, { Component } from "react";
import Footer from "./Footer";

class Coding extends Component {
  state = {
    password: "",
    message: "",
    email: "",
    checkbox: false,

    encryptionClicked: false,
    decryptionClicked: false,

    passwordValidation: false,
    messageValidation: false,
    codingValidation: false,
    emailValidation: false,
    allValidation: false,

    showValidationErrors: false,

    errorPasswordTooShort: true,
    errorPasswordTooLong: false,
    errorMessageTooShort: true,
    errorMessageTooLong: false,
    errorMessageNotCoded: true,
    errorEmailIsInvalid: false,
    errorcheckbox: false,
    showMessageWasSent: false,
  };

  messages = {
    errorPasswordTooShort: "The key is too short",
    errorPasswordTooLong: "The key is too long",
    errorMessageTooShort: "The text is too short",
    errorMessageTooLong: "The text is too long",
    errorMessageNotCoded: "The message was not coded",
    errorEmailIsInvalid: "Check if the mail is correct",
    errorcheckbox: "Please confirm",
    messageSend: "Success! Message was sent",
  };

  componentDidUpdate(prevProps, prevState) {
    let {
      encryptionClicked,
      password,
      message,
      email,
      checkbox,
      showValidationErrors,
      passwordValidation,
      messageValidation,
      codingValidation,
      emailValidation,
      showMessageWasSent
    } = this.state;

    if (prevState.password !== password) {
      this.passwordValidation();
    }
    if (prevState.message !== message) {
      this.messageValidation();
    }
    if (prevState.encryptionClicked !== encryptionClicked) {
      this.codingValidation();
    }
    if (prevState.email !== email) {
      this.emailValidation();
    }
    if (prevState.checkbox !== checkbox) {
      this.checkboxValidation();
    }
    if (
      prevState.passwordValidation !== passwordValidation ||
      prevState.messageValidation !== messageValidation ||
      prevState.codingValidation !== codingValidation ||
      prevState.emailValidation !== emailValidation ||
      prevState.checkbox !== checkbox
    ) {
      this.allValidation();
    }

    if (showValidationErrors || showMessageWasSent) {
      setTimeout(() => {
        this.setState({
          showValidationErrors: false,
          showMessageWasSent: false
        });
      }, 4000);
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

    if (passwordValidation && messageValidation) {
      this.codeMessage();
      this.handleEncryptionClickStatus();
    }
  };

  //po kliknięciu Decryption
  handleDecryption = () => {
    let { message, password } = this.state;
    let key = password.length - password.length * 2;

    this.handleDecryptionClickStatus();

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
    });
  };

  //po kliknięciu reset
  handleReset = () => {
    this.setState({
      password: "",
      message: "",
      email: "",
      checkbox: false,
      encryptionClicked: false,
      decryptionClicked: false,
      passwordValidation: false,
      messageValidation: false,
      codingValidation: false,
      emailValidation: false,
      allValidation: false,
      showValidationErrors: false,
      errorPasswordTooShort: true,
      errorPasswordTooLong: false,
      errorMessageTooShort: true,
      errorMessageTooLong: false,
      errorMessageNotCoded: true,
      errorEmailIsInvalid: false,
      errorcheckbox: false,
      showMessageWasSent: false,
    });
  };

  // po kliknięciu send
  handleSend = (event) => {
    let { allValidation, message } = this.state;
    event.preventDefault();

    if (allValidation) {
      console.log("wiadomość wysłąna");
      this.setState({
        showMessageWasSent: true,
      });
    } else {
      this.showValidationErrors();
    }

    setTimeout(this.handleReset, 4000);
  };

  handleEncryptionClickStatus = () => {
    this.setState({
      encryptionClicked: true,
      decryptionClicked: false,
    });
  };

  handleDecryptionClickStatus = () => {
    this.setState({
      encryptionClicked: false,
      decryptionClicked: true,
    });
  };

  handleCheckbox = () => {
    let { checkbox } = this.state;

    if (checkbox) {
      this.setState({
        checkbox: false,
      });
    } else {
      this.setState({
        checkbox: true,
      });
    }
  };

  //! pozostałe
  //kodowanie wiadomości
  codeMessage = () => {
    let { message, password } = this.state;
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
    });
  };

  passwordValidation = () => {
    let { password } = this.state;
    let errorPasswordTooShort = false;
    let errorPasswordTooLong = false;

    if (password.length < 4) {
      errorPasswordTooShort = true;
    }
    if (password.length >= 25) {
      errorPasswordTooLong = true;
    }

    this.setState({
      errorPasswordTooShort,
      errorPasswordTooLong,
    });

    if (!errorPasswordTooShort && !errorPasswordTooLong) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };

  messageValidation = () => {
    let { message } = this.state;
    let errorMessageTooShort = false;
    let errorMessageTooLong = false;

    if (message.length > 51) {
      errorMessageTooLong = true;
    }
    if (message.length < 4) {
      errorMessageTooShort = true;
    }

    this.setState({
      errorMessageTooShort,
      errorMessageTooLong,
    });

    if (!errorMessageTooShort && !errorMessageTooLong) {
      this.setState({
        messageValidation: true,
      });
    } else {
      this.setState({
        messageValidation: false,
      });
    }
  };

  //sprawdza czy jest zakodowana
  codingValidation = () => {
    let { encryptionClicked, decryptionClicked } = this.state;

    if (encryptionClicked && !decryptionClicked) {
      this.setState({
        codingValidation: true,
        errorMessageNotCoded: false,
      });
    } else {
      this.setState({
        codingValidation: false,
        errorMessageNotCoded: true,
      });
    }
  };

  emailValidation = () => {
    let { email } = this.state;

    if (
      email.length > 6 &&
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1
    ) {
      this.setState({
        emailValidation: true,
        errorEmailIsInvalid: false,
      });
    } else {
      this.setState({
        emailValidation: false,
        errorEmailIsInvalid: true,
      });
    }
  };

  checkboxValidation = () => {
    let { checkbox } = this.state;

    if (!checkbox) {
      this.setState({
        errorcheckbox: true,
      });
    } else {
      this.setState({
        errorcheckbox: false,
      });
    }
  };

  showValidationErrors = () => {
    this.setState({
      showValidationErrors: true,
    });
  };

  allValidation = () => {
    let {
      checkbox,
      passwordValidation,
      messageValidation,
      codingValidation,
      emailValidation,
    } = this.state;

    if (
      checkbox &&
      passwordValidation &&
      messageValidation &&
      codingValidation &&
      emailValidation
    ) {
      this.setState({
        allValidation: true,
      });
    } else {
      this.setState({
        allValidation: false,
      });
    }
  };

  render() {
    let {
      errorPasswordTooShort,
      errorPasswordTooLong,
      errorMessageTooShort,
      errorMessageTooLong,
      errorMessageNotCoded,
      errorEmailIsInvalid,
      errorcheckbox,
      encryptionClicked,
      password,
      message,
      email,
      showValidationErrors,
      allValidation,
      showMessageWasSent,
    } = this.state;

    let passwordStyle = "form-control margin text-center";
    let messageStyle = "form-control margin text-center";
    let emailStyle = "form-control margin text-center";
    let emailFeedbackStyle = "invalid-feedback margin2";

    let encryptionButton = encryptionClicked ? (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak2"
        disabled
      >
        Encryption
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak2"
        onClick={() => {
          this.handleEncryption();
          this.showValidationErrors();
        }}
      >
        Encryption
      </button>
    );

    let decryptionButton = encryptionClicked ? (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak"
        onClick={this.handleDecryption}
      >
        Decryption
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak"
        disabled
      >
        Decryption
      </button>
    );

    let resetButton =
      password !== "" || message !== "" || email !== "" ? (
        <button
          type="button"
          className="btn btn-outline-primary btnBreak2"
          onClick={this.handleReset}
        >
          Reset
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary btnBreak2"
          disabled
        >
          Reset
        </button>
      );

    if (
      (showValidationErrors && errorPasswordTooShort) ||
      (showValidationErrors && errorPasswordTooLong)
    ) {
      passwordStyle = "form-control margin3 text-center is-invalid";
    } else {
      passwordStyle = "form-control margin text-center";
    }
    if (
      (showValidationErrors && errorMessageTooShort) ||
      (showValidationErrors && errorMessageTooLong) ||
      (showValidationErrors && errorMessageNotCoded)
    ) {
      messageStyle = "form-control margin3 text-center is-invalid";
    } else {
      messageStyle = "form-control margin text-center";
    }
    if (showValidationErrors && errorEmailIsInvalid) {
      emailStyle = "form-control margin3 text-center is-invalid";
    } else {
      emailStyle = "form-control margin text-center";
    }
    if (showMessageWasSent) {
      emailFeedbackStyle = "margin4 sendMessage";
    } else {
      emailFeedbackStyle = "invalid-feedback margin2";
    }

    let passwordErrorTooShort = showValidationErrors &&
      errorPasswordTooShort && (
        <center>{this.messages.errorPasswordTooShort}</center>
      );
    let passwordErrorTooLong = showValidationErrors && errorPasswordTooLong && (
      <center>{this.messages.errorPasswordTooLong}</center>
    );

    let messageErrorTooShort = showValidationErrors && errorMessageTooShort && (
      <center>{this.messages.errorMessageTooShort}</center>
    );
    let messageErrorTooLong = showValidationErrors && errorMessageTooLong && (
      <center>{this.messages.errorMessageTooLong}</center>
    );
    let messageErrorNotCoded = showValidationErrors && errorMessageNotCoded && (
      <center>{this.messages.errorMessageNotCoded}</center>
    );
    let emailIsInvalid = showValidationErrors && errorEmailIsInvalid && (
      <center>{this.messages.errorEmailIsInvalid}</center>
    );
    let checkboxError = showValidationErrors && errorcheckbox && (
      <center>{this.messages.errorcheckbox}</center>
    );

    let messageSend = showMessageWasSent && allValidation && (
      <center>{this.messages.messageSend}</center>
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
                  {messageErrorTooLong}
                  {messageErrorNotCoded}
                </div>
              </div>

              <div className="col col-lg-2 margin">
                {encryptionButton}
                {decryptionButton}
                {resetButton}
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
                  {/* {checkboxError}
                  {messageSend} */}
                </div>

                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="checkbox"
                    required
                    onChange={this.handleCheckbox}
                  />
                  <label class="form-check-label" for="checkbox">
                    I'm not a robot
                  </label>
                </div>

                <div className={emailFeedbackStyle}>
                  {/* {emailIsInvalid} */}
                  {checkboxError}
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
        <Footer correct={showMessageWasSent} />
      </form>
    );
  }
}

export default Coding;
