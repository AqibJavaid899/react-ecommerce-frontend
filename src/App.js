import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Home } from "./scenes/home";
import { Checkout, Confirmation } from "./scenes/checkout";
import { CartMenu, Footer, Navbar } from "./scenes/global";
import { ItemDetails } from "./scenes/itemDetails";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
