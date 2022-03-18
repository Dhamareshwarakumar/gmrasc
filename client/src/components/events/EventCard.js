import React from 'react'
import { Link } from 'react-router-dom'


const EventCard = props => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={props.event.poster} className="card-img-top" alt="Event Name" />
            <div className="card-body">
                <h5 className="card-title">{props.event.name}</h5>
                <p className="card-text">{new Date(props.event.start_time).toLocaleDateString()}</p>
                <Link to={`/events/${props.event._id}`} className="btn btn-primary">View</Link>
            </div>
        </div>
    )
}

export default EventCard