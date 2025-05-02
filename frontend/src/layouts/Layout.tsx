import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-300">
      <Header />
      <div className="flex w-full flex-grow flex-col items-center justify-center p-4 sm:mx-auto sm:w-7/8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
