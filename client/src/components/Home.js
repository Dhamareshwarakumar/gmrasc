import React from 'react';
import './Home.css';


const Home = () => {
    return (
        <>
            {/* Landing Section */}
            <div className="home-landing-img">
                <div className="mask"></div>
                <div className="landing-text">
                    <h1>Welcome to</h1>
                    <h1>ACM Student Chapter,</h1>
                    <h1>GMRIT</h1>
                </div>
            </div>

            {/* Services */}
            <div className="container my-4">
                <h1 className="text-center mb-3">Services</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card p-2">
                            <img src="https://gmritchapter.acm.org/new/images/team_workshop.svg" alt="Workshops" className="card-img-top" />
                            <div className="card-body">
                                <h4 className="card-title">Workshops</h4>
                                <p className="card-text">
                                    GMRIT-ACM and ACM-W hosts interactive technical workshops and events that helps foster innovation and sharpen skills. We at GMRIT ACM and ACM-W, think of ways to make the world a better place by being the change we want to see.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-2">
                            <img src="https://gmritchapter.acm.org/new/images/team_sig.svg" alt="SIG's" className="card-img-top" />
                            <div className="card-body">
                                <h4 className="card-title">SIG's</h4>
                                <p className="card-text">
                                    Special Interest Groups are constituted for sustainable career which help the students to succeed in attaining career goals.The members of a SIG help their successors in learning contemporary technologies that strengthen competency.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-2">
                            <img src="https://gmritchapter.acm.org/new/images/team_code.svg" alt="Codeathon" className="card-img-top" />
                            <div className="card-body">
                                <h4 className="card-title">Codeathons</h4>
                                <p className="card-text">
                                    Code Anytime, an initiative augmented by GMRIT ACM and ACM-W in an effort to develop a coding culture within campus. An environment where everyone is provided with the opportunity to code, learn and grow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='text-center'>Welcome To GMRASC Chapter Management System</h1>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {/* Admin API  */}
                        <table className="table table-striped">
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
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <table className="table table-striped">
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