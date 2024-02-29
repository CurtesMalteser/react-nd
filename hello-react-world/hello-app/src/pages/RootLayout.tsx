import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';


function RouteLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default RouteLayout;