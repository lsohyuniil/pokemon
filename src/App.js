import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./pages/Home";
import Header from "./layout/Header";
import PokemonDetail from "./pages/PokemonDetail";
import SearchPage from "./pages/SearchPage";
import ScrollTopButton from "./components/ScrollTopButton";
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [selectedTypes, setSelectedTypes] = useState({});

  return ( 
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      <main>
        {/* <ScrollToTop /> */}
        <Routes>
          <Route path="/" element={<Home selectedTypes={selectedTypes} />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <ScrollTopButton />
      </main>
      {/* <Footer /> */}
    </BrowserRouter> 
  );
}

export default App;