import React from "react";

const EncryptionButton = ({ encryptionClicked, handleEncryption }) => {
  const encryptionButton = encryptionClicked ? (
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

  return encryptionButton 
};

export default EncryptionButton;
