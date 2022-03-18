import React from 'react'

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#000", color: "#fff", borderTop: "5px solid #007bff" }}>
            <div className="container">
                <div className="row justify-content-center py-3">
                    <div className="col-auto">
                        <i className="bi bi-facebook" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-twitter" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-linkedin" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                    <div className="col-auto">
                        <i className="bi bi-instagram" style={{ fontSize: "1.5rem" }}></i>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img src="https://gmritchapter.acm.org/public/img/logos/footer.png" alt="" />
                    </div>
                    <div className="col-md-4">
                        <h5>Useful Links</h5>
                        <ul style={{ listStyleType: "none" }}>
                            <li style={{ borderBottom: "1px solid grey", color: "#007bff" }}>link 1</li>
                            <li style={{ borderBottom: "1px solid grey", color: "#007bff" }}>link 2</li>
                            <li style={{ borderBottom: "1px solid grey", color: "#007bff" }}>link 3</li>
                            <li style={{ borderBottom: "1px solid grey", color: "#007bff" }}>link 4</li>
                            <li style={{ borderBottom: "1px solid grey", color: "#007bff" }}>link 5</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Address</h5>
                        <ul style={{ listStyleType: "none" }}>
                            <li>GMR Institute of Technology</li>
                            <li>GMR Nagar</li>
                            <li>Rajam - 532127 </li>
                            <li>Srikakulam Dist.</li>
                            <li>Andhra Pradesh</li>
                            <li>acm@gmrit.edu.in</li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center py-3">
                    <div className="col-auto text-center">
                        ACM Student Chapter | GMR Institute of Technology | 2022
                        <br />
                        Developed By Dhamareshwarakumar Gandikota
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer