import React, { useState, useEffect } from "react";
import { send } from "emailjs-com";
import Password from "./Password.jsx";
import Message from "./Message.jsx";
import Email from "./Email.jsx";
import Checkbox from "./Checkbox.jsx";
import EncryptionButton from "./EncryptionButton.jsx";
import DecryptionButton from "./DecryptionButton.jsx";
import ResetButton from "./ResetButton.jsx";
import SendButton from "./SendButton.jsx";
import Footer from "./Footer.jsx";

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
  const [errorMessageNotCoded, setErrorMessageNotCoded] = useState(false);
  const [errorcheckbox, setErrorcheckbox] = useState(false);
  const [showMessageWasSent, setShowMessageWasSent] = useState(false);
  const [resetAll, setresetAll] = useState(false);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const updatePassword = (localPassword) => {
    setPassword(localPassword);
  };

  const updatePasswordValidation = (localPasswordValidation) => {
    setPasswordValidation(localPasswordValidation);
  };

  const updateMessage = (localMessage) => {
    setMessage(localMessage);
  };

  const updateMessageValidation = (localMessageValidation) => {
    setMessageValidation(localMessageValidation);
  };

  const updateEmail = (localEmail) => {
    setEmail(localEmail);
  };

  const updateEmailValidation = (localEmailValidation) => {
    setEmailValidation(localEmailValidation);
  };

  const updateCheckbox = (localCheckbox) => {
    setCheckbox(localCheckbox);
  };

  const handleEncryption = () => {
    if (passwordValidation && messageValidation) {
      codeMessage();
      handleEncryptionClickStatus();
    } else {
      handleShowValidationErrors();
    }
  };

  const handleDecryption = () => {
    handleDecryptionClickStatus();

    if (passwordValidation && messageValidation) {
      decodeMessage();
    } else {
      handleShowValidationErrors();
    }
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
    setCodingValidation(false);
    setAllValidation(false);
    setShowValidationErrors(false);
    setErrorMessageNotCoded(false);
    setErrorcheckbox(false);
    setShowMessageWasSent(false);
    setresetAll(true);
    setResetButtonVisible(false);
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

  const decodeMessage = () => {
    let key = password.length - password.length * 2;

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

    const noCodeMessage = (message, key) => {
      if (key < 0) return noCodeMessage(message, key + 26);
      let output = "";
      for (let i = 0; i < message.length; i++) {
        let c = message[i];
        if (c.match(/[A-Z]/)) {
          let code = message.charCodeAt(i);
          if (code >= 65 && code <= 90) {
            c = String.fromCharCode(((code - 65 + key) % 26) + 65);
          } else if (code >= 97 && code <= 122) {
            c = String.fromCharCode(((code - 97 + key) % 26) + 97);
          }
        }
        output += c;
      }
      return output;
    };

    let codeToMessage = noCodeMessage(newMessage, key);

    setMessage(codeToMessage);
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

  const resetButtonVisibleValidation = () => {
    let checkResetButtonValidation = false;

    if (password !== "" || message !== "" || email !== "") {
      checkResetButtonValidation = true;
    } else {
      checkResetButtonValidation = false;
    }

    setResetButtonVisible(checkResetButtonValidation);
  };

  useEffect(() => {
    handleCodingValidation();
  }, [encryptionClicked]);

  useEffect(() => {
    resetButtonVisibleValidation();
  }, [password, message, email]);

  useEffect(() => {
    if (showValidationErrors || showMessageWasSent) {
      setTimeout(() => {
        setShowValidationErrors(false);
        setShowMessageWasSent(false);
      }, 4000);
    }
  }, [showValidationErrors, showMessageWasSent]);

  useEffect(() => {
    setTimeout(() => {
      setresetAll(false);
    }, 1000);
  }, [resetAll]);

  useEffect(() => {
    handleAllValidation();
  }, [
    passwordValidation,
    messageValidation,
    codingValidation,
    emailValidation,
    checkbox,
  ]);

  return (
    <form className="container" noValidate>
      <main className="marginTop">
        <Password
          updatePassword={updatePassword}
          updatePasswordValidation={updatePasswordValidation}
          showValidationErrors={showValidationErrors}
          resetAll={resetAll}
        />
        <section className="row">
          <div className="col col-lg-2 text-right">
            <label htmlFor="messageInput" className="margin">
              Message:
            </label>
          </div>
          <Message
            updateMessage={updateMessage}
            updateMessageValidation={updateMessageValidation}
            showValidationErrors={showValidationErrors}
            errorMessageNotCoded={errorMessageNotCoded}
            message={message}
            resetAll={resetAll}
          />
          <div className="col col-lg-2 margin">
            <EncryptionButton
              encryptionClicked={encryptionClicked}
              handleEncryption={handleEncryption}
            />
            <DecryptionButton
              decryptionClicked={decryptionClicked}
              handleDecryption={handleDecryption}
            />
            <ResetButton
              resetButtonVisible={resetButtonVisible}
              handleReset={handleReset}
            />
          </div>
        </section>
        <section className="row">
          <div className="col col-lg-2 text-right">
            <label htmlFor="emailInput" className="margin">
              E-mail:
            </label>
          </div>
          <Email
            updateEmail={updateEmail}
            updateEmailValidation={updateEmailValidation}
            showValidationErrors={showValidationErrors}
            resetAll={resetAll}
            decryptionClicked={decryptionClicked}
          />
          <div className="col col-lg-2 margin mobile">
            <SendButton
              password={password}
              message={message}
              email={email}
              handleSend={handleSend}
            />
          </div>
        </section>
        <section className="row">
          <Checkbox
            updateCheckbox={updateCheckbox}
            showValidationErrors={showValidationErrors}
            showMessageWasSent={showMessageWasSent}
            allValidation={allValidation}
            resetAll={resetAll}
            decryptionClicked={decryptionClicked}
          />
        </section>
      </main>
      <Footer
        showMessageWasSent={showMessageWasSent}
        errorcheckbox={errorcheckbox}
        showValidationErrors={showValidationErrors}
      />
    </form>
  );
};

export default Coding;
