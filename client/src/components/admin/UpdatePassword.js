import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setErrors, clearErrors } from '../../actions/errActions';


import Input from '../common/Input';
import Toast from '../common/Toast';

const UpdatePassword = props => {
    const [form, setForm] = useState({
        username: props.auth.user.username,
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        setErrors(props.err);
    }, [props]);

    const handleChange = e => {
        e.target.name === 'password' && setForm({
            ...form,
            password: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axios.put('/api/admin', form)
            .then(res => {
                props.clearErrors();
                setAlerts([...alerts, {
                    msg: res.data.msg,
                    type: 'success'
                }]);
                setForm({
                    username: props.auth.user.username,
                    password: ''
                });
                setTimeout(() => {
                    alerts.shift();
                    setAlerts([
                        ...alerts
                    ]);
                }, 3000);
            })
            .catch(err => {
                props.setErrors(err.response.data);
            });
    }

    return (
        <div className="container" style={{ height: "100%", width: "100%" }}>
            <div className="row justify-content-center align-items-center" style={{ height: "100%", width: "100%" }}>
                <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center text-primary">Admin Login</h2>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    value={form.username}
                                    error={errors.username}
                                    onChange={handleChange}
                                    label="Username"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={form.password}
                                    error={errors.password}
                                    onChange={handleChange}
                                    label="Password"
                                />
                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {alerts.map((alert, i) => (<Toast key={i} msg={alert.msg} type={alert.type} />))}
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
    auth: state.auth,
    err: state.err
});

export default connect(mapStateToProps, { setErrors, clearErrors })(UpdatePassword)