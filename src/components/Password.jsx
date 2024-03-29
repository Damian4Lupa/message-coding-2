import React, { useState, useEffect } from "react";
import messages from "../assets/Messages.js";

const Password = ({
  updatePassword,
  updatePasswordValidation,
  showValidationErrors,
  resetAll,
}) => {
  const [localPassword, setlocalPassword] = useState("");
  const [localPasswordValidation, setlocalPasswordValidation] = useState(false);
  const [errorPasswordTooShort, setErrorPasswordTooShort] = useState(true);
  const [errorPasswordTooLong, setErrorPasswordTooLong] = useState(false);

  const handleChangePassword = (event) => setlocalPassword(event.target.value);

  const handlePasswordValidation = () => {
    let checkPassword = localPassword.length;
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
    setlocalPasswordValidation(checkPasswordValidation);
  };

  let passwordStyle = "form-control margin text-center";

  if (
    (showValidationErrors && errorPasswordTooShort) ||
    (showValidationErrors && errorPasswordTooLong)
  ) {
    passwordStyle = "form-control margin3 text-center is-invalid";
  } else {
    passwordStyle = "form-control margin text-center";
  }

  let passwordErrorTooShort = showValidationErrors && errorPasswordTooShort && (
    <center>{messages.errorPasswordTooShort}</center>
  );
  let passwordErrorTooLong = showValidationErrors && errorPasswordTooLong && (
    <center>{messages.errorPasswordTooLong}</center>
  );

  useEffect(() => {
    handlePasswordValidation();
    updatePassword(localPassword);
    updatePasswordValidation(localPasswordValidation);
  }, [localPassword]);

  useEffect(() => {
    setlocalPassword("");
    setlocalPasswordValidation(false);
    setErrorPasswordTooShort(true);
    setErrorPasswordTooLong(false);
  }, [resetAll]);

  return (
    <section className="row">
      <div className="col col-lg-2 text-right">
        <label htmlFor="passwordInput" className="margin">
          Enter the key:
        </label>
      </div>
      <div className="col col-md-4">
        <input
          id="passwordInput"
          type="password"
          className={passwordStyle}
          value={localPassword}
          onChange={handleChangePassword}
          required
        />
        <div className="margin2">
          {passwordErrorTooShort}
          {passwordErrorTooLong}
        </div>
      </div>
      <div className="col col-lg-2 margin"></div>
    </section>
  );
};

export default Password;
