// Layout.tsx
import React, { ReactNode } from "react";
import Nav from "./Nav";
import "tailwindcss/tailwind.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="mx-auto mt-8 max-w-7xl">{children}</main>
    </div>
  );
};

export default Layout;
