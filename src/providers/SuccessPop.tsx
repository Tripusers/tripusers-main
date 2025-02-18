"use client";

import React from "react";
import Success from "../components/default/utils/email/Success";

const SuccessPopCtx = React.createContext<{
  showPop: boolean;
  changeState: (val: boolean) => void;
  text: string;
  setText: (val: string) => void;
}>({
  showPop: true,
  changeState() {},
  text: "",
  setText() {},
});

export const useSuccessPop = () => React.useContext(SuccessPopCtx);

export const SuccessPopUpProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [show, setShow] = React.useState(false);
  const [text, setText] = React.useState("");
  const handelHook = (val: boolean) => setShow(val);
  const handelTextHook = (val: string) => setText(val);
  const obj = React.useMemo(
    () => ({
      showPop: show,
      changeState: handelHook,
      text,
      setText: handelTextHook,
    }),
    []
  );
  return (
    <SuccessPopCtx.Provider value={obj}>
      {show && <Success text={text} />}
      {children}
    </SuccessPopCtx.Provider>
  );
};
