import "./globals.css";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Footer from './components/Footer';
import { AuthProvider } from "./components/AuthContext";

export const metadata = {
  title: "FutureTech AI",
  description: "Explore the Frontiers of Artificial Intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#141414]">
      <body className="bg-[#141414] text-white antialiased min-h-screen flex flex-col m-0 p-0">
        <AuthProvider>
          <TopBar />
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}