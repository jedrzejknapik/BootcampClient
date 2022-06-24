import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export const useToast = () => {
  const successToast = () => {
    openNotificationWithIcon("success", "SUKCES", "Operacja się powiodła.");
  };

  const errorToast = () => {
    openNotificationWithIcon("error", "BŁĄD", "Coś poszło nie tak.");
  };

  return {
    successToast,
    errorToast,
  };
};
