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

export function SmallScreenModalContextProvider({
  children,
}: PropsWithChildren) {
  const [modal, setModal] = useState<ModalProps | undefined>();
  const openModal = (modalProps: ModalProps) => setModal(modalProps);
  const closeModal = () => setModal(undefined);
  return (
    <ModalContext.Provider value={[openModal, closeModal]}>
      {children}
      {modal && (
        <div className="md:hidden">
          <Modal {...modal} />
        </div>
      )}
    </ModalContext.Provider>
  );
}

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
    <div className="absolute top-0 z-20 flex h-[100%] w-full place-content-center items-start justify-center overflow-y-auto bg-black bg-opacity-60">
      <div className="relative m-auto w-96 rounded bg-white shadow">
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
          <div className="">{content}</div>
        </div>
      </div>
    </div>
  );
}
