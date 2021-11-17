import React, { useState, useEffect } from "react";
import messages from "../assets/Messages.js";

const Message = ({
  updateMessage,
  updateMessageValidation,
  showValidationErrors,
  errorMessageNotCoded,
  message,
  resetAll,
}) => {
  const [localMessage, setLocalMessage] = useState(message);
  const [localMessageValidation, setlocalMessageValidation] = useState(false);
  const [errorMessageTooShort, setErrorMessageTooShort] = useState(true);
  const [errorMessageTooLong, setErrorMessageTooLong] = useState(false);

  const handleChangeMessage = (event) => setLocalMessage(event.target.value);

  const handleMessageValidation = () => {
    let checkErrorMessageTooShort = false;
    let checkErrorMessageTooLong = false;
    let checkMessageValidation = false;

    if (localMessage.length < 4) {
      checkErrorMessageTooShort = true;
    } else {
      checkErrorMessageTooShort = false;
    }

    if (localMessage.length > 51) {
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
    setlocalMessageValidation(checkMessageValidation);
  };

  let messageStyle = "form-control margin text-center";

  if (
    (showValidationErrors && errorMessageTooShort) ||
    (showValidationErrors && errorMessageTooLong) ||
    (showValidationErrors && errorMessageNotCoded)
  ) {
    messageStyle = "form-control margin3 text-center is-invalid";
  } else {
    messageStyle = "form-control margin text-center";
  }

  let messageErrorTooShort = showValidationErrors && errorMessageTooShort && (
    <center>{messages.errorMessageTooShort}</center>
  );
  let messageErrorTooLong = showValidationErrors && errorMessageTooLong && (
    <center>{messages.errorMessageTooLong}</center>
  );
  let messageErrorNotCoded = showValidationErrors && errorMessageNotCoded && (
    <center>{messages.errorMessageNotCoded}</center>
  );

  useEffect(() => {
    handleMessageValidation();
    updateMessage(localMessage);
    updateMessageValidation(localMessageValidation);
  }, [localMessage]);

  useEffect(() => {
    setLocalMessage("");
  }, [resetAll]);

  useEffect(() => {
    setLocalMessage(message);
  }, [message]);


  return (
    <div className="col col-md-4">
      <textarea
        id="messageInput"
        className={messageStyle}
        rows="5"
        value={localMessage}
        onChange={handleChangeMessage}
        required
      />

      <div className="margin2">
        {messageErrorTooShort}
        {messageErrorTooLong}
        {messageErrorNotCoded}
      </div>
    </div>
  );
};

export default Message;
