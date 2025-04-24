import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
