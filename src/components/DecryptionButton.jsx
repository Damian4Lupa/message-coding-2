import React from "react";

const DecryptionButton = ({ encryptionClicked, handleDecryption }) => {
  const decryptionButton = encryptionClicked ? (
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

  return decryptionButton;
};

export default DecryptionButton;
