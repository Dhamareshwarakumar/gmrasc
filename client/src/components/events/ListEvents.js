import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import Components
import EventCard from './EventCard';

const ListEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events')
            .then(res => setEvents(res.data.reverse()))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="events">
            <div className="container">
                <div className="row">
                    <h1 className='text-center mb-4'>Events List </h1>
                    {events.map(event => (
                        <div className="col-md-4 mb-3 d-flex justify-content-center" key={event._id}>
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListEvents