import { useState, PropsWithChildren, useEffect } from "react";

import { X } from "react-feather";

export default function TempToastMessage({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 1000);
    setTimeout(() => setVisible(false), 5000);
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed bottom-6 right-6 w-[90%] rounded-lg border-x-2 border-t-2 border-t-white bg-gradient-to-b from-orange-300 to-purple-300 pb-14 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div
            className="float-right text-right active:translate-y-1"
            onClick={() => setVisible(false)}
          >
            <X strokeWidth={0.75} />
          </div>
          <div className="p-5">{children}</div>
        </div>
      )}
    </>
  );
}
