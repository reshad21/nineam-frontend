import { ReactNode } from "react";

type TContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 min-h-screen">{children}</div>
  );
};

export default Container;
