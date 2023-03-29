import { PropsWithChildren } from "react";

type PanelProps = {
  title?: string;
};

export default function Panel({
  children,
  title,
}: PropsWithChildren<PanelProps>) {
  return (
    <>
      <div className="p-1">
        {title && <div className="p-2 text-2xl">{title}</div>}
        <div className="m-2 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2 py-2 ">
          {children}
        </div>
      </div>
    </>
  );
}
