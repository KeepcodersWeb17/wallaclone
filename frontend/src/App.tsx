import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";

function App() {
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
      <h1>{test}</h1>
      <LoginPage />
    </>
  );
}

export default App;
