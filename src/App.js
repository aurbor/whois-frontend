import React from 'react';
import Navbar from './components/Navbar.component';
import SearchBox from './components/SearchBox.component';
import Footer from './components/Footer.component';

function App() {
  return (
    <div className="root">
      <Navbar />
      <SearchBox />
      <Footer />
    </div>
  );
}

export default App;
