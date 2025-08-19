import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, cartItems, setCartItems, setToken, setUserOrders, token } = useContext(ShopContext);
    const navigate = useNavigate();

    const getTotalCartItems = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) total += cartItems[itemId][size];
            }
        }
        return total;
    };

    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        setUserOrders([]);
    };

    return (
        <div className='sticky px-15 top-0 z-50 w-full bg-white/60 backdrop-blur-md shadow-sm'>
            {/* Container aligned with Hero */}
            <div className='flex items-center justify-between py-2 px-2 max-w-[1440px] mx-auto font-medium'>
                
                {/* Logo */}
                <Link to='/'>
                    <img src={assets.logo} className='h-5' alt="Logo" />
                </Link>

                {/* Desktop Links */}
                <ul className='hidden sm:flex gap-8 text-sm text-gray-700'>
                    <NavLink to='/' className={({ isActive }) => `p-2 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}><p>HOME</p></NavLink>
                    <NavLink to='/collection' className={({ isActive }) => `p-2 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}><p>COLLECTION</p></NavLink>
                    <NavLink to='/about' className={({ isActive }) => `p-2 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}><p>ABOUT</p></NavLink>
                    <NavLink to='/contact' className={({ isActive }) => `p-2 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}><p>CONTACT</p></NavLink>
                </ul>

                {/* Right Icons */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />

                    {/* Profile */}
                    <div className="group relative">
                        <img onClick={() => (token ? null : navigate("/login"))} src={assets.profile_icon} alt="Profile Icon" className="w-5 cursor-pointer" />
                        {token && (
                            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
                                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg text-gray-700 rounded border border-gray-200">
                                    <Link to="/profile" className="cursor-pointer hover:text-black transition-colors duration-200">My Profile</Link>
                                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black transition-colors duration-200">Orders</p>
                                    <p onClick={logout} className="cursor-pointer hover:text-black transition-colors duration-200">Logout</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
                        {getTotalCartItems() > 0 && (
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-blue-500 text-white aspect-square rounded-full text-[8px]'>
                                {getTotalCartItems()}
                            </p>
                        )}
                    </Link>

                    {/* Mobile Menu Icon */}
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
                </div>
            </div>

            {/* Mobile Drawer & Overlay */}
            {visible && (
                <>
                    <div onClick={() => setVisible(false)} className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"></div>
                    <div className='fixed top-0 right-0 h-[80vh] w-80 md:w-96 bg-white/70 backdrop-blur-md z-50 shadow-lg p-6 rounded-l-2xl flex flex-col'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-3 p-3 border-b border-gray-200 cursor-pointer'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Close" />
                            <p className='font-bold'>Close</p>
                        </div>
                        <nav className='flex flex-col mt-4 gap-3'>
                            <NavLink onClick={() => setVisible(false)} to='/' className='py-3 px-4 hover:bg-gray-100 rounded transition-colors'>Home</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/collection' className='py-3 px-4 hover:bg-gray-100 rounded transition-colors'>Collection</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/about' className='py-3 px-4 hover:bg-gray-100 rounded transition-colors'>About</NavLink>
                            <NavLink onClick={() => setVisible(false)} to='/contact' className='py-3 px-4 hover:bg-gray-100 rounded transition-colors'>Contact</NavLink>
                        </nav>
                        <div className='mt-auto p-4'>
                            {token ? (
                                <button onClick={logout} className='w-full py-3 rounded-xl bg-gray-900 text-white font-medium'>Logout</button>
                            ) : (
                                <button onClick={() => { setVisible(false); navigate('/login'); }} className='w-full py-3 rounded-xl border border-gray-300 font-medium'>Login</button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
