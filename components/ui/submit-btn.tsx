"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";

interface Props extends ButtonProps {
  pending?: boolean;
}

const SubmitBtn = ({ ...props }: Props) => {
  const { pending } = useFormStatus();

  if (pending || props?.pending) {
    return (
      <Button disabled {...props}>
        <CgSpinner className="mr-2 animate-spin" />
        Please wait
      </Button>
    );
  }

  return <Button {...props} />;
};

export default SubmitBtn;
