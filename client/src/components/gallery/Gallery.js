import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../config/firebase';

import ImageCard from './ImageCard';
import Input from '../common/Input';

const storage = getStorage(firebaseApp);

const Gallery = props => {
    const [gallery, setGallery] = useState([]);
    const [form, setForm] = useState({
        event_name: '',
        date: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('/api/gallery')
            .then(res => setGallery(res.data))
            .catch(err => console.log(err.response.data));
    }, []);

    const hiddenFileInput = useRef(null);

    const handleFormChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    console.log(errors);
    const handleAddImage = e => {
        e.preventDefault();
        if (form.event_name.length === 0) {
            setErrors({
                ...errors,
                event_name: 'Event name is required'
            });
        } else {
            delete errors.event_name;
            setErrors({
                ...errors
            });
        }
        hiddenFileInput.current.click();
    };

    const handleSetImage = e => {
        const file = e.target.files[0];
        if (!file) {
            console.log('No file selected');
            //   set Errors
            return;
        }
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
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
                    axios.post('/api/gallery', {
                        url: downloadURL,
                        event_name: form.event_name,
                        date: form.date
                    })
                        .then(res => {
                            setGallery([
                                ...gallery,
                                {
                                    url: downloadURL,
                                    event_name: form.event_name,
                                    date: form.date
                                }
                            ]);
                            setForm({
                                event_name: '',
                                date: ''
                            });
                        })
                        .catch(err => console.log(err.response.data));
                });
            });
    }




    return (
        <div className='gallery'>
            <div className="container">
                {props.auth.isAuthenticated && (
                    <div className="row justify-content-end pt-3">
                        <div className="col-auto">
                            <form onSubmit={handleAddImage}>
                                <div className="row">
                                    <div className="col-auto">
                                        <input
                                            ref={hiddenFileInput}
                                            type="file"
                                            name="newImage"
                                            id="newImage"
                                            onChange={handleSetImage}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <Input
                                            type="text"
                                            name="event_name"
                                            value={form.event_name}
                                            onChange={handleFormChange}
                                            placeholder="Event name"
                                            error={errors.event_name}
                                            label=""
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <Input
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleFormChange}
                                            placeholder="Date"
                                            error={errors.date}
                                            label=""
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button type='submit' className='btn btn-primary'> + </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="row justify-content-center align-items-center">
                    <h1 className='text-center'>Gallery</h1>
                    {gallery.map(gallery => (
                        <div className="col-auto col-md-4 my-3">
                            <ImageCard key={gallery._id} gallery={gallery} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Gallery)