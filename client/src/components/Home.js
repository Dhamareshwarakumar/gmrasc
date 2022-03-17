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

            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        {/* Admin API  */}
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Path</th>
                                    <th>Permission</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Read Admins</td>
                                    <td>GET /api/admin</td>
                                    <td>Super Admin</td>
                                </tr>
                                <tr>
                                    <td>Create Admin</td>
                                    <td>POST /api/admin/createAdmin</td>
                                    <td>Super Admin</td>
                                </tr>
                                <tr>
                                    <td>Update Admin Password</td>
                                    <td>PUT /api/admin</td>
                                    <td>(Self) Admin</td>
                                </tr>
                                <tr>
                                    <td>Delete Admins</td>
                                    <td>DELETE /api/admin</td>
                                    <td>Super Admin</td>
                                </tr>
                                <tr>
                                    <td>Admin login</td>
                                    <td>POST /api/admin/</td>
                                    <td>Public</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Events API */}
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Operation</th>
                                    <th>Path</th>
                                    <th>Permission</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Read All Events</td>
                                    <td>GET /api/events</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>Read an event</td>
                                    <td>GET /api/events/:id</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>Create an Event</td>
                                    <td>POST /api/events</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>Update an Event</td>
                                    <td>PUT /api/events/:id</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>Delete an Event</td>
                                    <td>DELETE /api/events/:id</td>
                                    <td>Admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home