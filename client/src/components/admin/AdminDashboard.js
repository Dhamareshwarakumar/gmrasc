import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// Import Compnents
import AdminList from './AdminList';
import UpdatePassword from './UpdatePassword';
import CreateAdmin from './CreateAdmin';
import ListEvents from '../events/ListEvents';
import AddEvent from '../events/AddEvent';


const AdminDashboard = props => {
    const navigate = useNavigate();

    // Check the authentication status of the user
    useEffect(() => {
        if (!props.auth.isAuthenticated) {
            navigate('/admin');
        } else if (props.auth.user.role !== 0 && props.auth.user.role !== 1) {
            navigate('/');
        }
    }, [props, navigate]);


    // Visibility status of sidebar components
    let initialState = {
        adminsList: false,
        updatePassword: false,
        createAdmin: false,
        listevents: false,
        addevent: false
    }
    const [sidebar, setSidebar] = useState(initialState);

    // Toggle the visibility of sidebar components
    const handleSidebarClick = e => {
        setSidebar({
            ...initialState,
            [e.target.id]: true
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 border border-secondary" style={{ minHeight: "90vh" }}>
                    <div className="btn-group-vertical d-grid">
                        {props.auth.user.role === 0 && (<button id="adminsList" className="btn btn-primary border" onClick={handleSidebarClick}>Admins List (Super Admin)</button>)}

                        <button id="updatePassword" className="btn btn-primary border" onClick={handleSidebarClick}>Update Password</button>

                        {props.auth.user.role === 0 && (<button id="createAdmin" className="btn btn-primary border" onClick={handleSidebarClick}>Create Admin (Super Admin)</button>)}

                        <button id="listevents" className="btn btn-primary border" onClick={handleSidebarClick}>List Events</button>

                        <button id="addevent" className="btn btn-primary border" onClick={handleSidebarClick}>Add Event</button>
                    </div>
                </div>
                <div className="col-10">
                    {sidebar.adminsList && <AdminList />}
                    {sidebar.updatePassword && <UpdatePassword />}
                    {sidebar.createAdmin && <CreateAdmin />}
                    {sidebar.listevents && <ListEvents />}
                    {sidebar.addevent && <AddEvent />}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(AdminDashboard)