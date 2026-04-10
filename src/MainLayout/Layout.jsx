/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import NavbarModule from "../Modules/Components/NavbarModule";

const Layout = () => {
  return (
    <div className='webpage'>
      <section>
        <NavbarModule />
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
