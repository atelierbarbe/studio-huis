import "./globals.css";
import { Poppins } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Studio Huis",
  description: "Slim renovatieadvies op maat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={poppins.variable}>
      <body className="font-sans text-gray-900 bg-white flex flex-col min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
