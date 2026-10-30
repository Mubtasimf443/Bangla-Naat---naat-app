/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto px-8 py-8">
      <div className="mx-auto max-w-6xl">
        <Outlet />
      </div>
    </main>
  </div>
);

export default AdminLayout;
