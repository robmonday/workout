import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

import { X } from "react-feather";

export type ModalProps = {
  title?: string;
  content: string | ReactNode;
  level: "info" | "warning" | "error" | "purple";
  topBar?: boolean;
};

export const ModalContext = createContext<
  [(modal: ModalProps) => unknown, () => unknown]
>([() => console.log("Open modal"), () => console.log("Close modal")]);

export function ModalContextProvider({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<ModalProps | undefined>();
  const openModal = (modalProps: ModalProps) => setModal(modalProps);
  const closeModal = () => setModal(undefined);
  return (
    <ModalContext.Provider value={[openModal, closeModal]}>
      {children}
      {modal && <Modal {...modal} />}
    </ModalContext.Provider>
  );
}

export function Modal({
  title,
  content,
  level = "purple",
  topBar = false,
}: ModalProps) {
  const [openModal, closeModal] = useContext(ModalContext);
  const colors = {
    purple: "bg-purple-500",
    info: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  } satisfies Record<ModalProps["level"], string>;
  return (
    <div className="absolute top-0 z-20 flex w-full items-center justify-center overflow-clip bg-black bg-opacity-60 md:hidden">
      <div className="relative mt-2 mb-72 w-96 rounded bg-white shadow">
        {topBar && (
          <div
            className={`flex w-full items-center justify-between rounded-t px-5 py-3 text-xl text-white ${colors[level]}`}
          >
            <div>{title}</div>
            <button onClick={() => closeModal()}>
              <X />
            </button>
          </div>
        )}
        <div className="px-5 py-3 text-xl">
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}
