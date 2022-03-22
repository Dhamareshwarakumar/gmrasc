import axios from 'axios'
import React, { useState } from 'react'

const TestPayment = () => {
    // const [form, setForm] = useState({
    //     name: '',
    //     phone: '',
    //     email: '',
    //     amount: '500',
    //     custId: '123456',
    // });

    // const handleChange = e => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const makePayment = e => {
        const data = {
            amount: '500',
            email: '18341A0537@gmrit.edu.in',
            name: 'Srinivasarao',
            phone: '9866233109',
            custId: '12345'
        };

        axios.post('/api/payment', data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <form>
            {/* <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="amount">Amount</label>
                <input
                    type="text"
                    name='amount'
                    value={form.amount}
                />
            </div> */}
            <button type='button' onClick={makePayment}>Make Payment</button>
        </form>
    )
}

export default TestPayment