import React from 'react';


const ImageCard = props => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={props.gallery.url} className="card-img-top" alt="Event Name" />
            <div className="card-body">
                <h5 className="card-title">{props.gallery.event_name}</h5>
                <p className="card-text">{new Date(props.gallery.date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default ImageCard