import React from 'react'
import { Link } from 'react-router-dom'


const EventCard = () => {
    return (
        <div class="card" style={{ width: "18rem" }}>
            <img src="https://gmritchapter.acm.org/public/img/posters/workshop_on_poster_presentation.jpeg" class="card-img-top" alt="Event Name" />
            <div class="card-body">
                <h5 class="card-title">Event Title</h5>
                <p class="card-text">Date: </p>
                <Link to="#" class="btn btn-primary">View</Link>
            </div>
        </div>
    )
}

export default EventCard