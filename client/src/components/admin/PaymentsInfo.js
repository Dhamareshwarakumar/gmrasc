import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentsInfo = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get('/api/payment')
            .then(res => setPayments(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">JNTU No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                <th scope="col">Txn ID</th>
                                <th scope="col">Mode</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{payment.orderId}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.jntu_number}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.phone}</td>
                                    <td>{payment.email}</td>
                                    <td>{payment.payment_status}</td>
                                    <td>{payment.transaction_id}</td>
                                    <td>{payment.payment_mode}</td>
                                    <td>{payment.payment_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentsInfo