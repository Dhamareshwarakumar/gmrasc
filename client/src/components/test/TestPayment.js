import axios from 'axios'
import React, { useState } from 'react'

const TestPayment = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        amount: '500',
        custId: '123456',
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const makePayment = e => {
        axios.post('/api/payment', form)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="container">
            <div className="row mb-2">
                <div className="form">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center text-primary">Payment</h3>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name='name'
                                            value={form.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label htmlFor="phone" className='form-label'>Phone Number</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name='phone'
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            name='email'
                                            value={form.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label htmlFor="amount" className='form-label'>Amount</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name='amount'
                                            value={form.amount}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-12 d-grid">
                                    <button type='button' className="btn btn-primary" onClick={makePayment}>Make Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestPayment