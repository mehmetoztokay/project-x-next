import { RegisterForm } from "@/containers/Forms/Registration/RegisterForm";
import React from "react";

const Register = ({ searchParams }: { searchParams: { isMultiStep?: string } }) => {
  const isMultiStep = searchParams.isMultiStep == "true";

  return (
    <div>
      <RegisterForm isMultiStep={isMultiStep} />
    </div>
  );
};

export default Register;
