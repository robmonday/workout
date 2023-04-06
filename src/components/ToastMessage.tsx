import { PropsWithChildren } from "react";

type ToastMessageProps = {
  message: string;
};

export default function ToastMessage({ children }: PropsWithChildren) {
  return (
    <div className="float bottom-10 left-6">
      {children}
    </div>
  );
}
