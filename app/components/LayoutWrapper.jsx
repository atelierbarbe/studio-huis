"use client";

import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <MenuOverlay />}
      <main className="flex-grow">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
