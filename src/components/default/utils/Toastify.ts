import { toast } from "react-toastify";

export const toastEmail = () => {
  toast("Email send!, Check your email-inbox", {
    theme: "dark",
    autoClose: 3000,
  });
};

export const toastSuccess = () => {
  toast("Data successfully submitted!", {
    theme: "dark",
    autoClose: 3000,
  });
};
