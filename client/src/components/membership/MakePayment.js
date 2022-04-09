import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';


import Input from '../common/Input';


const MakePayment = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        years: '',
        amount: '0',
        // custId: '123456',
        jntu_number: ''
    });

    const [transactionInfo, setTransactionInfo] = useState({
        txnToken: '',
        orderId: '',
        mid: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleYears = e => {
        const amounts = {
            '1': '1',
            '2': '2',
            '3': '3'
        }
        // const amounts = {
        //     '1': '300',
        //     '2': '500',
        //     '3': '700'
        // }
        setForm({
            ...form,
            years: e.target.value,
            amount: amounts[e.target.value]
        })
    }

    const makePayment = e => {
        axios.post('/api/payment', form)
            .then(res => {
                console.log(res.data);
                setTransactionInfo(res.data);
            })
            .catch(err => {
                setErrors(err.response.data);
            });
    }

    const hiddenRef = useRef(null);

    useEffect(() => {
        if (transactionInfo.txnToken) {
            hiddenRef.current.submit();
        }
    }, [transactionInfo]);
    return (
        <section className="membership">
            <div className="container">
                <div className="row mb-2">
                    <div className="form">
                        <div className="cardd">
                            <div className="card-body">
                                <h3 className="card-title text-center text-primary">Payment</h3>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <Input
                                            label="Name"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={form.name}
                                            error={errors.name}
                                            onChange={handleChange}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <Input
                                            label="Phone Number"
                                            type='text'
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={form.phone}
                                            error={errors.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <Input
                                            label="Email"
                                            type='email'
                                            name="email"
                                            placeholder="Enter your email"
                                            value={form.email}
                                            error={errors.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <Input
                                            label="JNTU Number"
                                            type='text'
                                            name="jntu_number"
                                            placeholder="Enter your JNTU number"
                                            value={form.jntu_number}
                                            error={errors.jntu_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <label htmlFor="years" className='form-label'>No Of Years</label>
                                        <select className="form-select" onChange={handleYears}>
                                            <option selected>select menu</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row justify-content-center mb-2">
                                    <div className="col-8">
                                        <Input
                                            label="Amount"
                                            type='text'
                                            name="amount"
                                            placeholder="Enter your amount"
                                            value={form.amount}
                                            error={errors.amount}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-content-center my-3">
                                    <div className="col-8 d-grid">
                                        <button type='button' className="btn btn-primary" onClick={makePayment}>Make Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <form ref={hiddenRef} action={`https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${transactionInfo.mid}&orderId=${transactionInfo.orderId}`}>
                        <input type="hidden" name="txnToken" value={transactionInfo.txnToken} />
                        <input type="hidden" name="mid" value={transactionInfo.mid} />
                        <input type="hidden" name="orderId" value={transactionInfo.orderId} />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default MakePayment