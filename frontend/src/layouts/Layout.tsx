import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-red-200">
      <Header />
      <div className="grow p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
