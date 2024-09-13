import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, XMarkIcon, UserIcon, Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';
import Search from './Search';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const OrderHistory = () => {
        navigate('/orders');
    };

    useEffect(() => {
        setIsOpen(false);
        setIsDropdownOpen(false)
    }, [cart])

    return (
        <nav className="flex flex-col md:flex-row items-start md:items-center md:justify-between p-4 relative bg-white shadow-md">
            {/* Left side */}
            <div className="flex justify-between flex-shrink-0 items-center w-full md:w-auto">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold text-corg">
                    oneBite
                </NavLink>
                {/* Menu Toggle for Mobile */}
                <div className="md:hidden flex items-center ml-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-cgrey focus:outline-none"
                    >
                        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <div className={`flex-grow md:flex ${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-4`}>
                {/* Search Bar */}
                {/* <Search /> */}

                <div className="flex flex-col md:flex-row xs:items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 ml-auto">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${isActive ? 'text-corg' : ''} hover:text-corg`}
                    ><HomeIcon className="w-6 h-6 " /></NavLink>

                    {/* <Link to="/" className="hover:text-corg">Menu</Link> */}
                    {
                        isLoggedIn ? (
                            <NavLink
                                to="/cart"
                                className={({ isActive }) => `${isActive ? 'text-corg' : ''} relative hover:text-corg`}
                            ><ShoppingCartIcon className="w-6 h-6 " />
                                <span
                                    className="absolute -top-2 -right-2 bg-corg text-gray-900 text-xs px-1 rounded-full"
                                >{cart.length}</span>
                            </NavLink>
                        ) : null
                    }

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2"
                            >
                                <UserIcon className="w-6 h-6" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute md:right-0 mt-2 w-48 bg-white  text-cgrey shadow-md shadow-slate-700 rounded-md">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-corg hover:text-gray-800"
                                        onClick={OrderHistory}
                                    >Order History</button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-corg hover:text-gray-800"
                                        onClick={logout}
                                    >Log Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="md:px-4 py-2 rounded md:hover:bg-corg hover:text-black">Log In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
