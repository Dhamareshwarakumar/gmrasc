import axios from 'axios';
import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../config/firebase';
import classnames from 'classnames';

// import Components
import Input from '../common/Input';
import Toast from '../common/Toast';


const storage = getStorage(firebaseApp);


const AddEvent = () => {
    const intialFormState = {
        name: '',
        venue: '',
        start_time: '',
        end_time: '',
        type: '',
        category: '',
        poster: '',
        description: '',
        organisers: [{
            name: '',
            designation: '',
            contact: '',
            avatar: ''
        }],
        reg_fee: {
            acm_member: 0,
            non_acm_member: 0
        },
        reg_link: ''
    }
    const [form, setForm] = useState(intialFormState);

    const [poster, setPoster] = useState(null);
    const [errors, setErrors] = useState({});
    const [alerts, setAlerts] = useState([]);


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegFeeChange = e => {
        setForm({
            ...form,
            reg_fee: {
                ...form.reg_fee,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleAddOrganiser = e => {
        setForm({
            ...form,
            organisers: [
                ...form.organisers,
                {
                    name: '',
                    designation: '',
                    contact: '',
                    avatar: ''
                }
            ]
        });
    };

    const handleDeleteOrganiser = (index, e) => {
        const organisers = form.organisers.filter((organiser, i) => i !== index);
        setForm({
            ...form,
            organisers: organisers
        });
    };

    const handleOrganiserChange = (key, name, e) => {
        setForm({
            ...form,
            organisers: form.organisers.map((organiser, index) => {
                if (index === key) {
                    return {
                        ...organiser,
                        [name]: e.target.value
                    }
                }
                return organiser;
            })
        });
    }

    const handlePosterChange = e => {
        if (e.target.files[0]) {
            setPoster(e.target.files[0]);
        }
    }

    const handlePosterUpload = e => {
        if (!poster) {
            setErrors({
                ...errors,
                poster: 'Please select a file'
            });
            return;
        }
        const storageRef = ref(storage, 'images/' + poster.name);
        const uploadTask = uploadBytesResumable(storageRef, poster);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progress function ...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setForm({
                        ...form,
                        poster: downloadURL
                    });
                });
            });
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/api/events', form)
            .then(res => {
                setErrors({});
                setAlerts([
                    { type: 'success', msg: 'Event Added Successfully' }
                ]);
                setTimeout(() => {
                    setAlerts([]);
                }, 3000);
                setForm(intialFormState);
            })
            .catch(err => {
                setErrors(err.response.data);
            });
    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form>
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Add Event</h3>
                                {/* Event Name */}
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Event Name"
                                    label="Event Name"
                                    value={form.name}
                                    error={errors.name}
                                    onChange={handleChange}
                                />
                                {/* Event Venue */}
                                <Input
                                    type="text"
                                    name="venue"
                                    placeholder="Enter Venue"
                                    label="Venue"
                                    value={form.venue}
                                    error={errors.venue}
                                    onChange={handleChange}
                                />
                                {/* Start Time */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Input
                                            type="datetime-local"
                                            name="start_time"
                                            placeholder="Enter Event Start Time"
                                            label="Start Time"
                                            value={form.start_time}
                                            error={errors.start_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* End Time */}
                                    <div className="col-sm-6">
                                        <Input
                                            type="datetime-local"
                                            name="end_time"
                                            placeholder="Enter Event End Time"
                                            label="End Time"
                                            value={form.end_time}
                                            error={errors.end_time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* TODO: Change it to a dropdown */}
                                {/* Event Type */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Input
                                            type="text"
                                            name="type"
                                            placeholder="Enter Event Type"
                                            label="Type"
                                            value={form.type}
                                            error={errors.type}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* Event Category */}
                                    <div className="col-sm-6">
                                        <Input
                                            type="text"
                                            name="category"
                                            placeholder="Enter Event Category"
                                            label="Category"
                                            value={form.category}
                                            error={errors.category}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                {/* Poster */}
                                <div className="form-group mb-3">
                                    <div className="row align-items-start">
                                        <label htmlFor="poster">Poster</label>
                                        <div className="col-10">
                                            <div className="input-group">
                                                <input type="file" name="poster" className={classnames(
                                                    'form-control', {
                                                    'is-invalid': errors.poster
                                                }
                                                )} onChange={handlePosterChange} />
                                                {errors.poster && (<div className="invalid-feedback">{errors.poster}</div>)}
                                            </div>
                                        </div>
                                        <div className="col-2 d-grid">
                                            <button type="button" className='btn btn-primary' onClick={handlePosterUpload}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <Input
                                    type="hidden"
                                    name="poster"
                                    placeholder="Enter Poster URL"
                                    label=" "
                                    value={form.poster}
                                    error={errors.poster}
                                    onChange={handleChange}
                                /> */}
                                {/* TODO: Change it to TextArea */}
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Enter Event description"
                                    label="Description"
                                    value={form.description}
                                    error={errors.description}
                                    onChange={handleChange}
                                />
                                {/* TODO: Organisers */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <Input
                                            type="number"
                                            name="acm_member"
                                            placeholder="Enter ACM Member Fee"
                                            label="acm_member"
                                            value={form.reg_fee.acm_member}
                                            error={errors.reg_fee?.acm_member}
                                            onChange={handleRegFeeChange}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                            type="number"
                                            name="non_acm_member"
                                            placeholder="Enter ACM Member Fee"
                                            label="non_acm_member"
                                            value={form.reg_fee.non_acm_member}
                                            error={errors.reg_fee?.non_acm_member}
                                            onChange={handleRegFeeChange}
                                        />
                                    </div>
                                </div>
                                <Input
                                    type="text"
                                    name="reg_link"
                                    placeholder="Enter Event Registration Link"
                                    label="reg_link"
                                    value={form.reg_link}
                                    error={errors.reg_link}
                                    onChange={handleChange}
                                />

                            </div>
                        </div>
                        <div className="row justify-content-between my-3">
                            <div className="col-auto">
                                <h4>Organisers</h4>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary" onClick={handleAddOrganiser} type="button"><i className="bi bi-plus-circle"></i> Add</button>
                            </div>
                        </div>
                        {form.organisers.map((organiser, index) => (
                            <Organiser
                                key={index}
                                index={index}
                                organiser={organiser}
                                handleOrganiserChange={handleOrganiserChange}
                                handleDeleteOrganiser={handleDeleteOrganiser}
                                errors={errors.organisers}
                            />
                        ))}
                        {alerts.map((alert, i) => (<Toast key={i} msg={alert.msg} type={alert.type} />))}
                        <div className="d-grid py-2">
                            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

const Organiser = props => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row align-items-end ">
                    <div className="col-11">
                        <Input
                            type="text"
                            name={`organiser_${props.index}_name`}
                            placeholder="Enter Organiser Name"
                            label=""
                            value={props.organiser.name}
                            error={props.errors?.name}
                            onChange={(e) => props.handleOrganiserChange(props.index, 'name', e)}
                        />
                        <Input
                            type="text"
                            name={`organiser_${props.index}_designation`}
                            placeholder="Enter Organiser Designation"
                            label=""
                            value={props.organiser.designation}
                            error={props.errors?.designation}
                            onChange={(e) => props.handleOrganiserChange(props.index, 'designation', e)}
                        />
                        <Input
                            type="text"
                            name={`organiser_${props.index}_contact`}
                            placeholder="Enter Organiser Contact"
                            label=""
                            value={props.organiser.contact}
                            error={props.errors?.contact}
                            onChange={(e) => props.handleOrganiserChange(props.index, 'contact', e)}
                        />
                        <Input
                            type="text"
                            name={`organiser_${props.index}_avatar`}
                            placeholder="Enter Organiser Avatar URL"
                            label=""
                            value={props.organiser.avatar}
                            error={props.errors?.avatar}
                            onChange={(e) => props.handleOrganiserChange(props.index, 'avatar', e)}
                        />
                    </div>

                    <div className="col-1 border">
                        <button className='btn btn-danger' type="button" onClick={() => props.handleDeleteOrganiser(props.index)}><i className="bi bi-archive-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent