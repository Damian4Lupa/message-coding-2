import React, { useState, useEffect } from "react";
import messages from "../assets/Messages.js";

const Checkbox = ({
  updateCheckbox,
  showValidationErrors,
  showMessageWasSent,
  allValidation,
  resetAll,
}) => {
  const [localCheckbox, setlocalCheckbox] = useState(false);
  const [localErrorcheckbox, setlocalErrorcheckbox] = useState(false);

  const checkboxValidation = () => {
    let checkErrorcheckbox = false;

    if (!localCheckbox) {
      checkErrorcheckbox = true;
    } else {
      checkErrorcheckbox = false;
    }

    setlocalErrorcheckbox(checkErrorcheckbox);
  };

  const handleCheckbox = () => {
    let checkCheckbox = false;

    if (localCheckbox) {
      checkCheckbox = false;
    } else {
      checkCheckbox = true;
    }
    setlocalCheckbox(checkCheckbox);
  };

  let checkboxError = showValidationErrors && localErrorcheckbox && (
    <center>{messages.errorcheckbox}</center>
  );
  let messageSend = showMessageWasSent && allValidation && (
    <center>{messages.messageSend}</center>
  );
  let emailFeedbackStyle = "invalid-feedback margin2";
  if (showMessageWasSent) {
    emailFeedbackStyle = "margin4 sendMessage";
  } else {
    emailFeedbackStyle = "invalid-feedback margin2";
  }

  useEffect(() => {
    checkboxValidation();
    updateCheckbox(localCheckbox);
  }, [localCheckbox]);

  useEffect(() => {
    setlocalCheckbox(false);
  }, [resetAll]);

  return (
    <div className="col col-md-4">
      <div className="form-check">
        <input
          id="checkbox"
          type="checkbox"
          className="form-check-input"
          onChange={handleCheckbox}
          checked={localCheckbox}
          required
        />
        <label className="form-check-label" htmlFor="checkbox">
          I'm not a robot
        </label>
      </div>
      <div className={emailFeedbackStyle}>{messageSend}</div>
      <div className="margin2 margin4">{checkboxError}</div>
    </div>
  );
};

export default Checkbox;
