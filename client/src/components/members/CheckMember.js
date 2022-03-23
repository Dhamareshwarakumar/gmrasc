import React, { useState } from 'react';
import axios from 'axios';

// Import Components
import Input from '../common/Input';

const CheckMember = () => {
    const [form, setForm] = useState({
        jntu_number: '',
        acm_id: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.jntu_number.length !== 10) {
            setErrors({
                jntu_number: 'JNTU Number should be 10 digits'
            });

            setForm({
                ...form,
                acm_id: ''
            });
        } else {
            setErrors({});
            if (Object.keys(errors).length === 0) {
                axios.get(`/api/members/checkMember/${form.jntu_number}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.msg === "Member Verified") {
                            setForm({
                                ...form,
                                acm_id: res.data.acm_id
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data.jntu_number);
                        setErrors({
                            jntu_number: err.response.data.jntu_number
                        });
                        setForm({
                            ...form,
                            acm_id: ''
                        });
                    });
            }
        }

    }

    return (
        <div className="container" >
            <div className="row justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-3">Check Membership Status</h2>
                            <form>
                                <Input
                                    type="text"
                                    name="jntu_number"
                                    placeholder="JNTU Number"
                                    label="JNTU Number"
                                    value={form.jntu_number}
                                    error={errors.jntu_number}
                                    onChange={handleChange}
                                />
                                {form.acm_id !== '' && (
                                    <p className="text-success">Your ACM ID is: {form.acm_id}</p>
                                )}
                                <div className="d-grid">
                                    <button className="btn btn-primary my-2" onClick={handleSubmit}>Check</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckMember