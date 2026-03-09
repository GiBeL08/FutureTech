import "./globals.css";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Header />

        <main className="p-6">
          {children}
        </main>

      </body>
    </html>
  );
};