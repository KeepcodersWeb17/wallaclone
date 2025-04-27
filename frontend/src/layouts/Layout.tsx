import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-300">
      <Header />
      <div className="grow p-4 sm:mx-auto sm:w-7/8 md:mx-auto md:w-3/4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
