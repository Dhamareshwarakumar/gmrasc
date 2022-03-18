import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// CSS
import './EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();

    const [event, setEvent] = useState({});

    useEffect(() => {
        axios.get(`/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.log(err));
    }, [id]);

    let date = new Date(event.start_time);
    console.log(event);
    return (
        <div id='main'>
            {/* Landing Section */}
            <section id="landing">
                <div className="fluid-container">
                    <div className="row landing align-items-center">
                        <div className="col-md-1"></div>
                        <div className="col-12 col-md-5">
                            <h1 id="event_name">{event.name}</h1>
                            <p id="event_desc" className="text-justify mt-4">{event.description}</p>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            {/* FIXME: Add Wickedcss */}
                            <img src={event.poster} alt="Landing" className="floater landing-img" width="50%" height="auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* TODO: Add Register Button: Take the details, Show Registration Fee, redirect to payment gateway if necessary */}

            {/* Event Details */}
            <section id="details">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mb-4">
                            {/* FIXME: Add AOS */}
                            <div className="box" data-aos="zoom-in">
                                <div className="d-flex justify-content-center">
                                    <span className="mt-5">
                                        {/* ADD FontAwesome */}
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </span>
                                </div>
                                <h2 className="text-center text-light mt-4">Location</h2>
                                <p id="venue" className="text-light text-center">{event.venue}</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mb-4">
                            <div className="box" data-aos="zoom-in">
                                <div className="d-flex justify-content-center">
                                    <span className="mt-5">
                                        <i className="bi bi-list-task"></i>
                                    </span>
                                </div>
                                <h2 className="text-center text-light mt-4">Category</h2>
                                <p id="category" className="text-light text-center">{event.category}</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mb-4">
                            <div className="box" data-aos="zoom-in">
                                <div className="d-flex justify-content-center">
                                    <span className="mt-5">
                                        <i className="bi bi-calendar-event"></i>
                                    </span>
                                </div>
                                <h2 className="text-center text-light mt-4">Date</h2>
                                <p id="date" className="text-light text-center">{date.toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mt-4 mb-4">
                            <div className="box" data-aos="zoom-in">
                                <div className="d-flex justify-content-center">
                                    <span className="mt-5">
                                        <i className="bi bi-clock"></i>
                                    </span>
                                </div>
                                <h2 className="text-center text-light mt-4">Time</h2>
                                <p id="time" className="text-light text-center">{date.toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* resources */}
            {(event?.resources?.length > 0) && (
                <section id="resources">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center mt-5" id="resource_heading">Resources</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {event.resources.map((resource, index) => (
                                <div className="col-3 d-grid p-2" key={index}>
                                    <a type='button' className="btn btn-primary" href={resource.url} target="_blank" rel='noreferrer'>{resource.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Resource Persons */}
            {event?.resource_persons?.length > 0 && (
                <section id="winners">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="mt-5 text-center" id='winners_heading'>Resource Persons</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {event.resource_persons.map((resource_person, index) => (
                                <figure className="snip1527" key={index}>
                                    <div className="image">
                                        <img src={resource_person.avatar ? resource_person.avatar : 'https://gmritchapter.acm.org/public/img/team/2020-21/random.png'} alt="sample" />
                                    </div>
                                    <figcaption>
                                        <h3>{resource_person.name}</h3>
                                        <p>{resource_person.designation} {resource_person.college}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Winners */}
            {event?.results?.length > 0 && (
                <section id="winners">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="mt-5 text-center" id='winners_heading'>Winners</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {event.results.map((result, index) => (
                                <figure className="snip1527" key={index}>
                                    <div className="image">
                                        <img src={result.avatar ? result.avatar : 'https://gmritchapter.acm.org/public/img/team/2020-21/random.png'} alt="sample" />
                                    </div>
                                    <figcaption>
                                        <div className="date">{result.positin}</div>
                                        <h3>{result.name}</h3>
                                        <p>{result.designation} {result.college}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Organisers */}
            {event?.organisers?.length > 0 && (
                <section id="winners">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="mt-5 text-center" id='winners_heading'>Organisers</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {event.organisers.map((organiser, index) => (
                                <figure className="snip1527" key={index}>
                                    <div className="image">
                                        <img src={organiser.avatar ? organiser.avatar : 'https://gmritchapter.acm.org/public/img/team/2020-21/random.png'} alt="sample" />
                                    </div>
                                    <figcaption>
                                        <h3>{organiser.name}</h3>
                                        <p>{organiser.designation} {organiser.college}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default EventDetails