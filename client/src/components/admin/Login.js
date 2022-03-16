import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// Import Components
import Input from '../common/Input';

import { adminLogin } from '../../actions/authActions';

const Login = props => {
    const navigate = useNavigate();


    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate('/admin/dashboard');
        }
        setErrors(props.errors);
    }, [props, navigate]);



    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.adminLogin(form, navigate);
    }


    return (
        <div className="container">
            <div className="row justify-content-center align-items-center login-body">
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
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.err
})
export default connect(mapStateToProps, { adminLogin })(Login)