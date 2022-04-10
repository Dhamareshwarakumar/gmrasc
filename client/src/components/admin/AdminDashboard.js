import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// Import Compnents
import AdminList from './AdminList';
import UpdatePassword from './UpdatePassword';
import CreateAdmin from './CreateAdmin';
import ListEvents from '../events/ListEvents';
import ViewEvents from './ViewEvents';
import AddEvent from '../events/AddEvent';
import EditEvent from '../events/EditEvent';
import MembershipFee from './MembershipFee';
import PaymentsInfo from './PaymentsInfo';


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
        viewevents: false,
        addevent: false,
        membershipfee: false,
        paymentsinfo: false
    }
    const [sidebar, setSidebar] = useState(initialState);
    const [eventId, setEventId] = useState(null);

    // Toggle the visibility of sidebar components
    const handleSidebarClick = e => {
        setSidebar({
            ...initialState,
            [e.target.id]: true
        })
    }



    const handleEventEdit = id => {
        setEventId(id);
        setSidebar({
            ...initialState,
            editevent: true
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

                        <button id="viewevents" className="btn btn-primary border" onClick={handleSidebarClick}>View Events</button>
                        <button id="addevent" className="btn btn-primary border" onClick={handleSidebarClick}>Add Event</button>
                        <button id="membershipfee" className="btn btn-primary border" onClick={handleSidebarClick}>Membership Fee</button>
                        <button id="paymentsinfo" className="btn btn-primary border" onClick={handleSidebarClick}>Payments</button>
                    </div>
                </div>
                <div className="col-10">

                    {sidebar.adminsList && <AdminList />}
                    {sidebar.updatePassword && <UpdatePassword />}
                    {sidebar.createAdmin && <CreateAdmin />}
                    {sidebar.viewevents && <ViewEvents handleEventEdit={handleEventEdit} />}
                    {sidebar.addevent && <AddEvent />}
                    {sidebar.editevent && <EditEvent id={eventId} />}
                    {sidebar.membershipfee && <MembershipFee />}
                    {sidebar.paymentsinfo && <PaymentsInfo />}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(AdminDashboard)