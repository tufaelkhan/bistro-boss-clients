import { FaCalendarAlt, FaDiceThree, FaHome, FaMedal, FaShoppingCart, FaWallet, FaUtensils, FaBook, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart()

//TODO: load data from the server to have dynamic isAdmin based on Data
  // const isAdmin = true
  const [isAdmin] = useAdmin();
  // console.log(isAdmin)
    return (
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  <Outlet></Outlet>
  
  </div> 
  <div className="drawer-side bg-[#D1A054]">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 h-full">
      {
        isAdmin ? <>
      <li><NavLink to='/dashboard/adminhome'><FaHome></FaHome>Admin Home</NavLink></li>
      <li><NavLink to='/dashboard/additem'><FaUtensils></FaUtensils> Add AN Item</NavLink></li>
      <li><NavLink to='/dashboard/manageitems'><FaWallet></FaWallet>Managed Items</NavLink></li>
      <li><NavLink to='/dashboard/history'><FaBook></FaBook> Manage Bookings</NavLink></li>
      <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers>All Users</NavLink></li>
        </> :
        //user dashboard
        <>
      <li><NavLink to='/dashboard/userhome'><FaHome></FaHome>User Home</NavLink></li>
      <li><NavLink to='/dashboard/reservation'><FaCalendarAlt></FaCalendarAlt>Reservation</NavLink></li>
      <li><NavLink to='/dashboard/history'><FaWallet></FaWallet>Payment History</NavLink></li>
      <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>MY Cart <span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink>
      </li>
        </>
      }


      <div className="divider"></div>
      <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
      <li><NavLink to='/menu'><FaDiceThree></FaDiceThree> Our Menu</NavLink></li>
        <li><NavLink to='/order/salad'><FaMedal></FaMedal> Order Food</NavLink></li>
    </ul>
  
  </div>
</div>
    );
};

export default DashBoard;