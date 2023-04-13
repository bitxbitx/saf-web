import React from "react";

import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import Heading from "../../../common/Heading/Heading";

const AccountRecoveryForm = (props) => {
  return (
    <form>
      <Heading
          title="Account Recovery"
          description="Enter the Email or Username of the account you wish to recover below. We will send you a recovery email to your email."
        />
      <InputField label="Email or Username" type="text" />
      <Button label="Get Recovery Email" btnColor="#8bd5f8" color="black" vertMargin="20px"/>
    </form>
  );
};

export default AccountRecoveryForm;
