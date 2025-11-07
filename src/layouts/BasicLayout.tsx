import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideMenu from "../components/SideMenu";

export default function BasicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center p-4 bg-white shadow">
        <button onClick={() => setMenuOpen(true)} className="text-3xl">☰</button>
        <h1 className="ml-4 text-xl font-bold">SpaceCloud</h1>



      </header>

      <Outlet /> {/* 각 페이지(UI)는 여기에서 렌더링 */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}