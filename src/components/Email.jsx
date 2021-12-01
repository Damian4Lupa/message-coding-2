import React, { useState, useEffect } from "react";
import messages from "../assets/Messages.js";

const Email = ({
  updateEmail,
  updateEmailValidation,
  showValidationErrors,
  resetAll,
  decryptionClicked,
}) => {
  const [localEmail, setLocalEmail] = useState("");
  const [localEmailValidation, setLocalEmailValidation] = useState(false);
  const [errorEmailIsInvalid, setErrorEmailIsInvalid] = useState(false);

  const handleChangeEmail = (event) => setLocalEmail(event.target.value);

  const handleEmailValidation = () => {
    let checkEmailValidation = false;
    let checkErrorEmailIsInvalid = false;

    if (
      localEmail.length > 6 &&
      localEmail.indexOf("@") !== -1 &&
      localEmail.indexOf(".") !== -1
    ) {
      checkEmailValidation = true;
      checkErrorEmailIsInvalid = false;
    } else {
      checkEmailValidation = false;
      checkErrorEmailIsInvalid = true;
    }

    setLocalEmailValidation(checkEmailValidation);
    setErrorEmailIsInvalid(checkErrorEmailIsInvalid);
  };

  let emailStyle = "form-control margin text-center";

  if (!decryptionClicked && showValidationErrors && errorEmailIsInvalid) {
    emailStyle = "form-control margin3 text-center is-invalid";
  } else {
    emailStyle = "form-control margin text-center";
  }

  let emailIsInvalid = !decryptionClicked &&
    showValidationErrors &&
    errorEmailIsInvalid && <center>{messages.errorEmailIsInvalid}</center>;

  useEffect(() => {
    handleEmailValidation();
    updateEmail(localEmail);
    updateEmailValidation(localEmailValidation);
  }, [localEmail, localEmailValidation]);

  useEffect(() => {
    setLocalEmail("");
  }, [resetAll]);

  return (
    <div className="col col-md-4">
      <input
        id="emailInput"
        type="email"
        className={emailStyle}
        placeholder="Send a message to your friend"
        value={localEmail}
        onChange={handleChangeEmail}
        required
      />
      <div className="margin2">{emailIsInvalid}</div>
    </div>
  );
};

export default Email;
