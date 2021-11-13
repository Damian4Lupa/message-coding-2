import React, { useState, useEffect } from "react";
import { send } from "emailjs-com";
import Footer from "./Footer.js";

import messages from "../assets/Messages.js";

const Coding = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [encryptionClicked, setEncryptionClicked] = useState(false);
  const [decryptionClicked, setDecryptionClicked] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [codingValidation, setCodingValidation] = useState(false);
  const [allValidation, setAllValidation] = useState(false);

  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const [errorPasswordTooShort, setErrorPasswordTooShort] = useState(true);
  const [errorPasswordTooLong, setErrorPasswordTooLong] = useState(false);
  const [errorMessageTooShort, setErrorMessageTooShort] = useState(true);
  const [errorMessageTooLong, setErrorMessageTooLong] = useState(false);
  const [errorMessageNotCoded, setErrorMessageNotCoded] = useState(true);
  const [errorEmailIsInvalid, setErrorEmailIsInvalid] = useState(false);
  const [errorcheckbox, setErrorcheckbox] = useState(false);

  const [showMessageWasSent, setShowMessageWasSent] = useState(false);

  useEffect(() => {
    handlePasswordValidation();
    handleMessageValidation();
    handleCodingValidation();
    handleEmailValidation();
    checkboxValidation();
  }, [password, message, encryptionClicked, email, checkbox]);

  useEffect(() => {
    handleAllValidation();
  }, [
    passwordValidation,
    messageValidation,
    codingValidation,
    emailValidation,
    checkbox,
  ]);

  useEffect(() => {
    if (showValidationErrors || showMessageWasSent) {
      setTimeout(() => {
        setShowValidationErrors(false);
        setShowMessageWasSent(false);
      }, 4000);
    }
  }, [showValidationErrors, showMessageWasSent]);

  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeMessage = (event) => setMessage(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleEncryption = () => {
    // let { passwordValidation, messageValidation } = this.state;

    if (passwordValidation && messageValidation) {
      codeMessage();
      handleEncryptionClickStatus();
    }
  };

  const handleDecryption = () => {
    // let { message, password } = this.state;
    let key = password.length - password.length * 2;

    handleDecryptionClickStatus();

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

    setMessage(codeToMessage);

    // this.setState({
    //   message: codeToMessage,
    // });
  };

  const handleReset = () => {
    setPassword("");
    setMessage("");
    setEmail("");
    setCheckbox(false);
    setEncryptionClicked(false);
    setDecryptionClicked(false);
    setPasswordValidation(false);
    setMessageValidation(false);
    setEmailValidation(false);
    setAllValidation(false);
    setShowValidationErrors(false);
    setErrorPasswordTooShort(true);
    setErrorPasswordTooLong(false);
    setErrorMessageTooShort(true);
    setErrorMessageTooLong(false);
    setErrorMessageNotCoded(true);
    setErrorEmailIsInvalid(false);
    setErrorcheckbox(false);
    setShowMessageWasSent(false);
  };

  const handleSend = (event) => {
    // let { allValidation, message, email } = this.state;
    event.preventDefault();
    // this.showValidationErrors();

    let toSend = {
      message: message,
      send_to: email,
    };

    const ServiceID = "service_messagecoding";
    const TemplateID = "template_50l63q9";
    const UserID = "user_ODU8rLD61NH0RQu6lmxOx";

    if (allValidation) {
      setShowMessageWasSent(true);
      // this.setState({
      //   showMessageWasSent: true,
      // });

      send(ServiceID, TemplateID, toSend, UserID)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
      setTimeout(handleReset, 4000);
    } else {
      handleShowValidationErrors();
    }
  };

  const handleEncryptionClickStatus = () => {
    setEncryptionClicked(true);
    setDecryptionClicked(false);

    // this.setState({
    //   encryptionClicked: true,
    //   decryptionClicked: false,
    // });
  };

  const handleDecryptionClickStatus = () => {
    setEncryptionClicked(false);
    setDecryptionClicked(true);

    // this.setState({
    //   encryptionClicked: false,
    //   decryptionClicked: true,
    // });
  };

  const handleCheckbox = () => {
    // let { checkbox } = this.state;

    if (checkbox) {
      setCheckbox(false);
      // this.setState({
      //   checkbox: false,
      // });
    } else {
      setCheckbox(true);
      // this.setState({
      //   checkbox: true,
      // });
    }
  };

  const codeMessage = () => {
    // let { message, password } = this.state;
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

    setMessage(codeMessage);
    // this.setState({
    //   message: codeMessage,
    // });
  };

  const handlePasswordValidation = () => {
    // let { password } = this.state;
    // let errorPasswordTooShort = false;
    // let errorPasswordTooLong = false;

    if (password.length < 4) {
      setErrorPasswordTooShort(true);
      // errorPasswordTooShort = true;
    }
    if (password.length >= 25) {
      setErrorPasswordTooLong(true);
      // errorPasswordTooLong = true;
    }

    // this.setState({
    //   errorPasswordTooShort,
    //   errorPasswordTooLong,
    // });

    if (!errorPasswordTooShort && !errorPasswordTooLong) {
      setPasswordValidation(true);
      // this.setState({
      //   passwordValidation: true,
      // });
    } else {
      setPasswordValidation(false);
      // this.setState({
      //   passwordValidation: false,
      // });
    }
  };

  const handleMessageValidation = () => {
    // let { message } = this.state;
    // let errorMessageTooShort = false;
    // let errorMessageTooLong = false;

    if (message.length > 51) {
      setErrorMessageTooLong(true);
      // errorMessageTooLong = true;
    }
    if (message.length < 4) {
      setErrorMessageTooShort(true);
      // errorMessageTooShort = true;
    }

    // this.setState({
    //   errorMessageTooShort,
    //   errorMessageTooLong,
    // });

    if (!errorMessageTooShort && !errorMessageTooLong) {
      setMessageValidation(true);
      // this.setState({
      //   messageValidation: true,
      // });
    } else {
      setMessageValidation(false);
      // this.setState({
      //   messageValidation: false,
      // });
    }
  };

  const handleCodingValidation = () => {
    // let { encryptionClicked, decryptionClicked } = this.state;

    if (encryptionClicked && !decryptionClicked) {
      setCodingValidation(true);
      setErrorMessageNotCoded(false);

      // this.setState({
      //   codingValidation: true,
      //   errorMessageNotCoded: false,
      // });
    } else {
      setCodingValidation(false);
      setErrorMessageNotCoded(true);

      // this.setState({
      //   codingValidation: false,
      //   errorMessageNotCoded: true,
      // });
    }
  };

  const handleEmailValidation = () => {
    // let { email } = this.state;

    if (
      email.length > 6 &&
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1
    ) {
      setEmailValidation(true);
      setErrorEmailIsInvalid(false);

      // this.setState({
      //   emailValidation: true,
      //   errorEmailIsInvalid: false,
      // });
    } else {
      setEmailValidation(false);
      setErrorEmailIsInvalid(true);

      // this.setState({
      //   emailValidation: false,
      //   errorEmailIsInvalid: true,
      // });
    }
  };

  const checkboxValidation = () => {
    // let { checkbox } = this.state;

    if (!checkbox) {
      setErrorcheckbox(true);

      // this.setState({
      //   errorcheckbox: true,
      // });
    } else {
      setErrorcheckbox(false);
      // this.setState({
      //   errorcheckbox: false,
      // });
    }
  };

  const handleShowValidationErrors = () => {
    setAllValidation(true);

    // this.setState({
    //   showValidationErrors: true,
    // });
  };

  const handleAllValidation = () => {
    // let {
    //   checkbox,
    //   passwordValidation,
    //   messageValidation,
    //   codingValidation,
    //   emailValidation,
    // } = this.state;

    if (
      checkbox &&
      passwordValidation &&
      messageValidation &&
      codingValidation &&
      emailValidation
    ) {
      setAllValidation(true);

      // this.setState({
      //   allValidation: true,
      // });
    } else {
      setAllValidation(false);

      // this.setState({
      //   allValidation: false,
      // });
    }
  };

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
        handleEncryption();
        handleShowValidationErrors();
      }}
    >
      Encryption
    </button>
  );

  let decryptionButton = encryptionClicked ? (
    <button
      type="button"
      className="btn btn-outline-primary btnBreak"
      onClick={handleDecryption}
    >
      Decryption
    </button>
  ) : (
    <button type="button" className="btn btn-outline-primary btnBreak" disabled>
      Decryption
    </button>
  );

  let resetButton =
    password !== "" || message !== "" || email !== "" ? (
      <button
        type="button"
        className="btn btn-outline-primary btnBreak2"
        onClick={handleReset}
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

  let passwordErrorTooShort = showValidationErrors && errorPasswordTooShort && (
    <center>{messages.errorPasswordTooShort}</center>
  );
  let passwordErrorTooLong = showValidationErrors && errorPasswordTooLong && (
    <center>{messages.errorPasswordTooLong}</center>
  );

  let messageErrorTooShort = showValidationErrors && errorMessageTooShort && (
    <center>{messages.errorMessageTooShort}</center>
  );
  let messageErrorTooLong = showValidationErrors && errorMessageTooLong && (
    <center>{messages.errorMessageTooLong}</center>
  );
  let messageErrorNotCoded = showValidationErrors && errorMessageNotCoded && (
    <center>{messages.errorMessageNotCoded}</center>
  );
  let emailIsInvalid = showValidationErrors && errorEmailIsInvalid && (
    <center>{messages.errorEmailIsInvalid}</center>
  );
  let checkboxError = showValidationErrors && errorcheckbox && (
    <center>{messages.errorcheckbox}</center>
  );

  let messageSend = showMessageWasSent && allValidation && (
    <center>{messages.messageSend}</center>
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
                // aria-describedby="inputGroupPrepend3"
                required
                value={password}
                onChange={handleChangePassword}
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
                rows="5"
                // aria-describedby="inputGroupPrepend3"
                required
                value={message}
                onChange={handleChangeMessage}
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
                required
                // aria-describedby="emailHelp"
                placeholder="Send a message to your friend"
                value={email}
                onChange={handleChangeEmail}
              />
              <div className={emailFeedbackStyle}>{emailIsInvalid}</div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="Checkbox"
                  required
                  onChange={handleCheckbox}
                  checked={checkbox}
                />
                <label className="form-check-label" htmlFor="checkbox">
                  I'm not a robot
                </label>
              </div>
              <div className={emailFeedbackStyle}>{messageSend}</div>
              <div className="margin2 margin4">{checkboxError}</div>
            </div>

            <div className="col col-lg-2 margin mobile">
              <button
                className="btn btn-outline-primary btnBreak3"
                type="submit"
                value="Send"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer
        correct={showMessageWasSent || (errorcheckbox && showValidationErrors)}
      />
    </form>
  );
};

export default Coding;
