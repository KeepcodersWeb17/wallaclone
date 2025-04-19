import { useEffect, useState } from "react";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [test, setTest] = useState<string>("Loading...");

  useEffect(() => {
    fetch("https://api.wallaclone.keepcoders.duckdns.org/test") // Fetch de test al endpoint /test
      .then((res) => res.json())
      .then((data) => setTest(data.test))
      .catch((err) => {
        console.error(err);
        setTest("Error loading data");
      });
  }, []);
  return (
    <>
      <Header />
      <h1 className="text-xxl mt-10 text-center font-bold text-red-500">
        {test}
      </h1>
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
