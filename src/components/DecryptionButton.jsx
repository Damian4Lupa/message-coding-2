import React from "react";

const DecryptionButton = ({ decryptionClicked, handleDecryption }) => {
  const decryptionButton = decryptionClicked ? (
    <button type="button" className="btn btn-outline-primary btnBreak" disabled>
      Decryption
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-outline-primary btnBreak"
      onClick={handleDecryption}
    >
      Decryption
    </button>
  );

  return decryptionButton;
};

export default DecryptionButton;
