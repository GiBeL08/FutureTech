import "./globals.css";
import Header from "./components/Header";
import TopBar from "./components/TopBar";
import Footer from './components/Footer'; 

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
      {/* min-h-screen: растягивает body на всю высоту экрана.
          flex-col: позволяет нам управлять расположением элементов.
          bg-[#141414]: гарантирует, что даже за пределами контента всё будет черным.
      */}
      <body className="bg-[#141414] text-white antialiased min-h-screen flex flex-col m-0 p-0">
        
        <TopBar />
        <Header />

        {/* flex-grow: заставляет main занимать всё свободное место, выталкивая футер вниз.
            Убрали p-6, чтобы контент (Hero, баннеры) прилегал к краям. 
            Внутри самих компонентов мы уже настроили px-6 lg:px-20.
        */}
        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer /> 

      </body>
    </html>
  );
}