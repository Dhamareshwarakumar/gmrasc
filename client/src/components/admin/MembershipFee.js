import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../common/Input';


const MembershipFee = () => {
    const [membershipFee, setMembershipFee] = useState([]);

    const [addMembershipForm, setAddMembershipForm] = useState({
        academicYear: '',
        one_year: '',
        two_years: '',
        three_years: '',
        current_academic_year: ''
    });

    const [addMembershipFormErrors, setAddMembershipFormErrors] = useState({});


    useEffect(() => {
        axios.get('/api/membershipFee')
            .then(res => setMembershipFee(res.data))
            .catch(err => console.log(err));
    }, []);


    const handleAddMembershipFormChange = e => {
        setAddMembershipForm({
            ...addMembershipForm,
            [e.target.name]: e.target.value
        });
    };

    const handleAddMembershipForm = e => {
        console.log('check');
        e.preventDefault();

        axios.post('/api/membershipFee', addMembershipForm)
            .then(res => {
                setMembershipFee([...membershipFee, res.data]);
                setAddMembershipForm({
                    academic_year: '',
                    one_year: '',
                    two_years: '',
                    three_years: '',
                    current_academic_year: ''
                });
            })
            .catch(err => setAddMembershipFormErrors(err.response.data));
    };


    const handleMembershipFeeDelete = id => {
        axios.delete(`/api/membershipFee/${id}`)
            .then(setMembershipFee(membershipFee.filter(fee => fee._id !== id)))
            .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-12">
                        <h2 className='text-center'>Current Academic Year: <span className="text-primary">{membershipFee[0]?.current_academic_year}</span></h2>
                    </div>
                </div>
                <div className="row my-5 justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Academic Year</th>
                                    <th scope="col">One Year Fee</th>
                                    <th scope="col">Two Years Fee</th>
                                    <th scope="col">Three Years Fee</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membershipFee.map(fee => (
                                    <tr key={fee._id}>
                                        <td>{fee.academic_year}</td>
                                        <td>{fee.one_year}</td>
                                        <td>{fee.two_years}</td>
                                        <td>{fee.three_years}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning mx-1"
                                                type='button'
                                                onClick={() => console.log(`Edit`)}
                                            >
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>
                                            <button
                                                className="btn btn-danger mx-1"
                                                type='button'
                                                onClick={() => handleMembershipFeeDelete(fee._id)}
                                            >
                                                <i className="bi bi-archive"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleAddMembershipForm}>
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title text-center mb-4">Add New Membership Fee</h3>
                                    <Input
                                        label="Academic Year"
                                        type="text"
                                        name="academic_year"
                                        placeholder="Academic Year"
                                        value={addMembershipForm.academic_year}
                                        onChange={handleAddMembershipFormChange}
                                        error={addMembershipFormErrors.academic_year}
                                    />
                                    <Input
                                        label="One Year Fee"
                                        type="Number"
                                        name="one_year"
                                        placeholder="One Year Fee"
                                        value={addMembershipForm.one_year}
                                        onChange={handleAddMembershipFormChange}
                                        error={addMembershipFormErrors.one_year}
                                    />
                                    <Input
                                        label="Two Years Fee"
                                        type="Number"
                                        name="two_years"
                                        placeholder="Two Years Fee"
                                        value={addMembershipForm.two_years}
                                        onChange={handleAddMembershipFormChange}
                                        error={addMembershipFormErrors.two_years}
                                    />
                                    <Input
                                        label="Three Years Fee"
                                        type="Number"
                                        name="three_years"
                                        placeholder="Three Years Fee"
                                        value={addMembershipForm.three_years}
                                        onChange={handleAddMembershipFormChange}
                                        error={addMembershipFormErrors.three_years}
                                    />
                                    <Input
                                        label="Current Academic Year"
                                        type="text"
                                        name="current_academic_year"
                                        placeholder="Current Academic Year"
                                        value={addMembershipForm.current_academic_year}
                                        onChange={handleAddMembershipFormChange}
                                        error={addMembershipFormErrors.current_academic_year}
                                    />
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MembershipFee