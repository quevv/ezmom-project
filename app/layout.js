import Header from "@/components/Header";
import "./styles/globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "Ezmom",
    template: "Ezmom - %s",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
