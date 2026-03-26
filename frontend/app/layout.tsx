import "./globals.css";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Footer from './components/Footer'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>

          <TopBar />

          <Header />

          <main className="p-6">
            {children}
          </main>
          <Footer /> 
        </div>

      </body>
    </html>
  );
};