import React, { useState } from "react";
import Converter from "./components/Converter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav/Nav";

export default function App() {
  const [converToCipher, setConvertToCipher] = useState(true);

  return (
    <div className="container">
      <Nav />
      <main className="row justify-content-lg-center">
        <Header
          setConvertToCipher={setConvertToCipher}
          converToCipher={converToCipher}
        />
        <Converter converToCipher={converToCipher} />
        <Footer />
      </main>
    </div>
  );
}
