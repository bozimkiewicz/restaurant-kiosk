import { Routes, Route } from "react-router";
import "./App.css";
import ADMINPanel from "./components/Admin/ADMINPanel";
import LoginForm from "./components/Admin/AdminForm/LoginForm";
import LoginRoute from "./components/Admin/AdminForm/LoginRoute";
import Greetings from "./components/Greetings";
import Home from "./components/Home";
import OrderMethod from "./components/OrderMethod";
import Payment from "./components/Payment/Payment";

function App() {
  return (
    <div className="p-5 bg-yellow-50 shadow-md text-black rounded-md">
      <header>
        <h1>Kiosk restauracyjny</h1>
      </header>
      <Routes>
        <Route path="/" element={<Greetings />}></Route>
        <Route path="/order-method" element={<OrderMethod />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route element={<LoginRoute />}>
          <Route path="/crud/*" element={<ADMINPanel />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
