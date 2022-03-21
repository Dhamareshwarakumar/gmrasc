import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../config/firebase';

const storage = getStorage(firebaseApp);


const TestUpload = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleFileUpload = e => {
        const storageRef = ref(storage, 'images/' + image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
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
                    console.log('File available at', downloadURL);
                });
            });
    }

    console.log(image);

    return (
        <form>
            <input type="file" onChange={handleFileChange} />
            <button type="button" onClick={handleFileUpload}>Upload</button>
        </form>
    )
}

export default TestUpload