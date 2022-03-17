import React, { useEffect, useState } from 'react';
import axios from 'axios';


import AdminCard from './AdminCard';
import Toast from '../common/Toast';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get('/api/admin')
            .then(res => {
                setAdmins(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = username => {
        axios.delete('/api/admin/' + username)
            .then(res => {
                setAdmins(admins.filter(admin => admin.username !== username));
                setAlerts([...alerts, {
                    msg: res.data.msg,
                    type: 'success'
                }]);
                setTimeout(() => {
                    alerts.shift();
                    setAlerts([
                        ...alerts
                    ]);
                }, 5000);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {admins.map(admin => (<AdminCard key={admin.id} username={admin.username} role={admin.role} handleDelete={handleDelete} />))}
                    {alerts.map((alert, i) => (<Toast key={i} msg={alert.msg} type={alert.type} />))}
                </div>
            </div>

        </div>
    )
}

export default AdminList