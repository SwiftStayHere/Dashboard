import { Route, Routes } from "react-router-dom";
import Booking from "../pages/Booking";
import Dashboard from "../pages/Dashboard";
import EditModule from "../pages/EditModule";
import Home from "../pages/Home";
import Hotel from "../pages/Hotel";
import HotelDetails from "../pages/HotelDetails";
import HotelEdit from "../pages/HotelEdit";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Modules from "../pages/Modules";
import Transport from "../pages/Transport";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<Home />} />
        <Route path="booking" element={<Booking />} />
        <Route path="hotel" element={<Hotel />} />
        <Route path="hotel/:id" element={<HotelDetails />} />
        <Route path="hotel/edit/:id" element={<HotelEdit />} />
        <Route path="module" element={<Modules />} />
        <Route path="module/edit/:id" element={<EditModule />} />
        <Route path="transport" element={<Transport />} />
        <Route path="setting" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Index />} />
    </Routes>
  );
}
