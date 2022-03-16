import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <h1 className='text-center'>Welcome To GMRASC Chapter Management System</h1>

            <h2 className='mt-5'>Checkout the links here</h2>
            <ul>
                <li><Link to="/admin">Admin Dashboard</Link></li>
            </ul>
        </>
    )
}

export default Home