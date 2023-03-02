import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

// comps
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

function App() {
   return (
      <div className="App">
         <Navbar />

         <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/allProducts" exact element={<Products />} />
            <Route path="/order" exact element={<Orders />} />
            <Route path="/history" exact element={<History />} />
         </Routes>
      </div>
   );
}

export default App;
