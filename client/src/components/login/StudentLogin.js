import React from 'react'

const Login = () => {
    return (
        <form method="POST">
            {/* Page Color Divider */}
            <div className="page-divider"></div>
            {/* Landing Section */}
            <div className="container">
                <div className="row adminlogin_landing">
                    {/* Landing Section -- Card */}
                    <div className="card adminlogin_landing_card">
                        <h3 className="text-center display-4 login-heading" style={{ margin: "15px" }}>
                            Student <span className="text-primary">Login</span>
                        </h3>

                        {/* Landing Section -- Card -- Main Area */}
                        <div className="container ">
                            <div className="row align-items-center justify-content-center adminlogin_landing_card_main">
                                {/* Landing Section --Card -- Main Area -- Image */}
                                <div className="col-md-6">
                                    <img src="/img/login.png" alt="Login SVG" style={{ width: "100%", height: "auto" }} />
                                </div>
                                {/* Landing Section --Card -- Main Area -- Form */}
                                <div className="col-12 col-md-6">
                                    <p className="text-center" style={{ fontSize: "2rem" }} >Open Elective <span className="text-primary">Registration</span></p>
                                    {/* Landing Section --Card -- Main Area -- Form -- Input Field */}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control mb-2"
                                            placeholder="JNTU Number"
                                            style={{ borderRadius: "20px" }}
                                        />
                                        <div className="feedback" style={{ display: "none" }}>
                                            Feedback
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control mb-2"
                                            placeholder="Password"
                                            style={{ borderRadius: "20px" }}
                                        />
                                        <div className="feedback" style={{ display: "none" }}>
                                            Feedback
                                        </div>
                                    </div>
                                    <button type="submit" name="google_login" value="login" className="btn btn-outline-primary btn-block" style={{ borderRadius: "50px", width: "100%" }}>Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </form >
    )
}

export default Login