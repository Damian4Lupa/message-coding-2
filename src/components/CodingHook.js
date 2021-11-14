import React, { useState, useEffect } from "react";
import { send } from "emailjs-com";
import Footer from "./Footer.js";

import messages from "../assets/Messages.js";

const Coding = () => {
  const [password, setPassword] = useState(""); //! 1
  const [message, setMessage] = useState(""); //! 2
  const [email, setEmail] = useState(""); //! 3
  const [checkbox, setCheckbox] = useState(false); //! 4

  const [encryptionClicked, setEncryptionClicked] = useState(false); //! 5
  const [decryptionClicked, setDecryptionClicked] = useState(false); //! 6

  const [passwordValidation, setPasswordValidation] = useState(false); //! 7
  const [messageValidation, setMessageValidation] = useState(false); //! 8
  const [emailValidation, setEmailValidation] = useState(false); //! 9
  const [codingValidation, setCodingValidation] = useState(false); //! 10
  const [allValidation, setAllValidation] = useState(false); //! 11

  const [showValidationErrors, setShowValidationErrors] = useState(false); //! 12

  const [errorPasswordTooShort, setErrorPasswordTooShort] = useState(true); //! 13
  const [errorPasswordTooLong, setErrorPasswordTooLong] = useState(false); //! 14
  const [errorMessageTooShort, setErrorMessageTooShort] = useState(true); //! 15
  const [errorMessageTooLong, setErrorMessageTooLong] = useState(false); //! 16
  const [errorMessageNotCoded, setErrorMessageNotCoded] = useState(true); //! 17
  const [errorEmailIsInvalid, setErrorEmailIsInvalid] = useState(false); //! 18
  const [errorcheckbox, setErrorcheckbox] = useState(false); //! 19

  const [showMessageWasSent, setShowMessageWasSent] = useState(false); //! 20

  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeMessage = (event) => setMessage(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleEncryption = () => {
    handleShowValidationErrors();
    if (passwordValidation && messageValidation) {
      codeMessage();
      handleEncryptionClickStatus();
    }
  };

  const handleDecryption = () => {
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
    event.preventDefault();
    let checkShowMessageWasSent = false;
    handleShowValidationErrors();

    let toSend = {
      message: message,
      send_to: email,
    };

    const ServiceID = "service_messagecoding";
    const TemplateID = "template_50l63q9";
    const UserID = "user_ODU8rLD61NH0RQu6lmxOx";

    if (allValidation) {
      checkShowMessageWasSent = true;

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

    setShowMessageWasSent(checkShowMessageWasSent);
  };

  const handleEncryptionClickStatus = () => {
    setEncryptionClicked(true);
    setDecryptionClicked(false);
  };

  const handleDecryptionClickStatus = () => {
    setEncryptionClicked(false);
    setDecryptionClicked(true);
  };

  const handleCheckbox = () => {
    let checkCheckbox = false;

    if (checkbox) {
      checkCheckbox = false;
    } else {
      checkCheckbox = true;
    }
    setCheckbox(checkCheckbox);
  };

  const codeMessage = () => {
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
  };

  const handlePasswordValidation = () => {
    let checkPassword = password.length;
    let PasswordTooShort = true;
    let PasswordTooLong = false;
    let checkPasswordValidation = false;

    if (checkPassword < 4) {
      PasswordTooShort = true;
    } else {
      PasswordTooShort = false;
    }

    if (checkPassword >= 25) {
      PasswordTooLong = true;
    } else {
      PasswordTooLong = false;
    }

    if (!errorPasswordTooShort && !errorPasswordTooLong) {
      checkPasswordValidation = true;
    } else {
      checkPasswordValidation = false;
    }

    setErrorPasswordTooShort(PasswordTooShort);
    setErrorPasswordTooLong(PasswordTooLong);
    setPasswordValidation(checkPasswordValidation);
  };

  const handleMessageValidation = () => {
    let checkErrorMessageTooShort = false;
    let checkErrorMessageTooLong = false;
    let checkMessageValidation = false;

    if (message.length < 4) {
      checkErrorMessageTooShort = true;
    } else {
      checkErrorMessageTooShort = false;
    }

    if (message.length > 51) {
      checkErrorMessageTooLong = true;
    } else {
      checkErrorMessageTooLong = false;
    }

    if (!errorMessageTooShort && !errorMessageTooLong) {
      checkMessageValidation = true;
    } else {
      checkMessageValidation = false;
    }

    setErrorMessageTooShort(checkErrorMessageTooShort);
    setErrorMessageTooLong(checkErrorMessageTooLong);
    setMessageValidation(checkMessageValidation);
  };

  const handleCodingValidation = () => {
    let checksetCodingValidation = false;
    let checksetErrorMessageNotCoded = false;

    if (encryptionClicked && !decryptionClicked) {
      checksetCodingValidation = true;
      checksetErrorMessageNotCoded = false;
    } else {
      checksetCodingValidation = false;
      checksetErrorMessageNotCoded = true;
    }
    setCodingValidation(checksetCodingValidation);
    setErrorMessageNotCoded(checksetErrorMessageNotCoded);
  };

  const handleEmailValidation = () => {
    let checkEmailValidation = false;
    let checkErrorEmailIsInvalid = false;

    if (
      email.length > 6 &&
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1
    ) {
      checkEmailValidation = true;
      checkErrorEmailIsInvalid = false;
    } else {
      checkEmailValidation = false;
      checkErrorEmailIsInvalid = true;
    }

    setEmailValidation(checkEmailValidation);
    setErrorEmailIsInvalid(checkErrorEmailIsInvalid);
  };

  const checkboxValidation = () => {
    let checkErrorcheckbox = false;

    if (!checkbox) {
      checkErrorcheckbox = true;
    } else {
      checkErrorcheckbox = false;
    }

    setErrorcheckbox(checkErrorcheckbox);
  };

  const handleShowValidationErrors = () => {
    setShowValidationErrors(true);
  };

  const handleAllValidation = () => {
    let checkAllValidation = false;

    if (
      checkbox &&
      passwordValidation &&
      messageValidation &&
      codingValidation &&
      emailValidation
    ) {
      checkAllValidation = true;
    } else {
      checkAllValidation = false;
    }

    setAllValidation(checkAllValidation);
  };

  useEffect(() => {
    handlePasswordValidation();
    handleMessageValidation();
    handleCodingValidation();
    handleEmailValidation();
    checkboxValidation();
  }, [password, message, encryptionClicked, email, checkbox]);

  useEffect(() => {
    if (showValidationErrors || showMessageWasSent) {
      setTimeout(() => {
        setShowValidationErrors(false);
        setShowMessageWasSent(false);
      }, 4000);
    }
  }, [showValidationErrors, showMessageWasSent]);

  useEffect(() => {
    handleAllValidation();
  }, [
    passwordValidation,
    messageValidation,
    codingValidation,
    emailValidation,
    checkbox,
  ]);

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
      onClick={handleEncryption}
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
              <label htmlFor="passwordInput" className="margin">
                Enter the key:
              </label>
            </section>
            <section className="col col-md-4">
              <input
                id="passwordInput"
                type="password"
                className={passwordStyle}
                value={password}
                onChange={handleChangePassword}
                required
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
              <label htmlFor="messageInput" className="margin">
                Message:
              </label>
            </div>
            <div className="col col-md-4">
              <textarea
                id="messageInput"
                className={messageStyle}
                rows="5"
                value={message}
                onChange={handleChangeMessage}
                required
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
              <label htmlFor="emailInput" className="margin">
                E-mail:
              </label>
            </div>
            <div className="col col-md-4">
              <input
                id="emailInput"
                type="email"
                className={emailStyle}
                placeholder="Send a message to your friend"
                value={email}
                onChange={handleChangeEmail}
                required
              />
              <div className={emailFeedbackStyle}>{emailIsInvalid}</div>

              <div className="form-check">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleCheckbox}
                  checked={checkbox}
                  required
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
