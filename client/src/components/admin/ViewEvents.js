import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewEvents = props => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events')
            .then(res => setEvents(res.data.reverse()))
            .catch(err => console.log(err));
    }, []);

    const handleEventDelete = (id, e) => {
        axios.delete('/api/events/' + id)
            .then(res => {
                console.log(`Event Deleted`);
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(err => console.log(err));
    }

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={event._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{event.name}</td>
                        <td>{new Date(event.start_time).toLocaleDateString()}</td>
                        <td>{event.type}</td>
                        <td className=''>
                            <button className="btn btn-warning mx-1" onClick={() => props.handleEventEdit(event._id)}><i className="bi bi-pencil-square"></i> Edit</button>
                            <button className="btn btn-danger mx-1" type='button' onClick={() => handleEventDelete(event._id)}><i className="bi bi-archive"></i> Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ViewEvents