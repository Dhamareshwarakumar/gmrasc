const { isEmpty } = require('./my_validator');
const validator = require('validator');
const { NAME_REGEX, PH_NO_REGEX } = require('./regex.js');


const validateNewEvent = (req, res, next) => {
    let errors = {};

    // Validating Name
    if (isEmpty(req.body.name)) {
        errors.name = `Name is required`;
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors.name = `Name must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
    }

    // Validating Venue
    if (isEmpty(req.body.venue)) {
        errors.venue = `Venue is required`;
    } else if (!NAME_REGEX.test(req.body.venue)) {
        errors.venue = `Venue must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
    }

    // Validating Start Time
    if (isEmpty(req.body.start_time)) {
        errors.start_time = `Start time is required`;
    } else if (validator.isDate(new Date(req.body.start_time))) {
        req.body.start_time = new Date(req.body.start_time);
    } else {
        errors.start_time = `Start time must be a valid date`;
    }

    // Validating End Time
    if (isEmpty(req.body.end_time)) {
        errors.end_time = `End time is required`;
    } else if (validator.isDate(new Date(req.body.end_time))) {
        req.body.end_time = new Date(req.body.end_time);
    } else {
        errors.end_time = `End time must be a valid date`;
    }

    // Validating Type
    // TODO: ADD All Possible Types
    // Seminar, Webinar, Workshop, Discussions, Competition, ACM Awareness Programme, MISC
    if (isEmpty(req.body.type)) {
        errors.type = `Type is required`;
    }

    // Validating Category
    // TODO: ADD All Possible Categories (SIG's)
    if (isEmpty(req.body.category)) {
        errors.category = `Category is required`;
    }

    // Validating Poster
    if (isEmpty(req.body.poster)) {
        errors.poster = `Poster is required`;
    } else if (!validator.isURL(req.body.poster)) {
        errors.poster = `Poster must be a valid URL`;
    }

    // Validating Description
    if (isEmpty(req.body.description)) {
        errors.description = `Description is required`;
    } else if (!validator.isLength(req.body.description, { min: 12 })) {
        errors.description = `Description must be at least 12 characters long`;
    }

    // Validating Resource Persons
    // TODO: Send Error Validation to Individual Resource Person
    if (!isEmpty(req.body.resource_persons)) {
        req.body.resource_persons.forEach(person => {
            if (isEmpty(person.name)) {
                errors.resource_persons = `Resource Persons must have a name`;
            } else if (!NAME_REGEX.test(person.name)) {
                errors.resource_persons = `Resource Persons must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
            }

            if (isEmpty(person.designation)) {
                errors.resource_persons = `Resource Persons must have a designation`;
            }

            if (!isEmpty(person.avatar)) {
                if (!validator.isURL(person.avatar)) {
                    errors.resource_persons = `Resource Persons must have a valid avatar URL`;
                }
            }
        });
    }

    // Validating Resources
    // TODO: Send Error Validation to Individual Resource
    if (!isEmpty(req.body.resources)) {
        req.body.resources.forEach(resource => {
            if (isEmpty(resource.name)) {
                errors.resources = `Resources must have a name`;
            } else if (!NAME_REGEX.test(resource.name)) {
                errors.resources = `Resources must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
            }

            if (isEmpty(resource.url)) {
                errors.resources = `Resources must have a URL`;
            } else if (!validator.isURL(resource.url)) {
                errors.resources = `Resources must have a valid URL`;
            }
        });
    }

    // Validating results
    if (!isEmpty(req.body.results)) {
        req.body.results.forEach(result => {
            if (isEmpty(result.name)) {
                errors.results = `Results must have a name`;
            } else if (!NAME_REGEX.test(result.name)) {
                errors.results = `Results must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
            }

            if (isEmpty(result.position)) {
                errors.results = `Results must have a position`;
            } else if (!Number(result.position)) {
                errors.results = `Results must have a valid position`;
            }

            if (isEmpty(result.designation)) {
                errors.results = `Results must have a designation`;
            }

            if (isEmpty(result.college)) {
                errors.results = `Results must have a College`;
            } else if (!NAME_REGEX.test(result.college)) {
                errors.results = `Results must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
            }

            if (!isEmpty(result.avatar)) {
                if (!validator.isURL(result.avatar)) {
                    errors.results = `Results must have a valid avatar URL`;
                }
            }
        });
    }

    // Validating organisers
    if (isEmpty(req.body.organisers)) {
        errors.organisers = `Organisers are required`;
    } else {
        errors.organisers = {};
        req.body.organisers.forEach(organiser => {
            if (isEmpty(organiser.name)) {
                errors.organisers.name = `Organisers must have a name`;
            } else if (!NAME_REGEX.test(organiser.name)) {
                errors.organisers.name = `Organisers must be 3-64 characters long and only contain alphanumeric characters, spaces, commas, dashes, and parentheses`;
            }

            if (isEmpty(organiser.designation)) {
                errors.organisers.designation = `Organisers must have a designation`;
            }

            if (isEmpty(organiser.contact)) {
                errors.organisers.contact = `Organisers must have a contact`;
            } else if (!PH_NO_REGEX.test(organiser.contact)) {
                errors.organisers.contact = `Organisers must have a valid contact`;
            }

            if (!isEmpty(organiser.avatar)) {
                if (!validator.isURL(organiser.avatar)) {
                    errors.organisers.avatar = `Organisers must have a valid avatar URL`;
                }
            }

        });
        if (isEmpty(errors.organisers)) {
            delete errors.organisers;
        }
    }

    // validating reg_fee
    if (isEmpty(req.body.reg_fee)) {
        errors.reg_fee = `Registration Fee is required`;
    } else {
        errors.reg_fee = {};
        if (isEmpty(req.body.reg_fee.acm_member)) {
            errors.reg_fee.acm_member = `ACM Member Registration Fee is required`;
        }
        if (isEmpty(req.body.reg_fee.non_acm_member)) {
            errors.reg_fee.non_acm_member = `Non ACM Member Registration Fee is required`;
        }
        if (isEmpty(errors.reg_fee)) {
            delete errors.reg_fee;
        }
    }

    // validating reg_link
    if (isEmpty(req.body.reg_link)) {
        errors.reg_link = `Registration Link is required`;
    } else if (!validator.isURL(req.body.reg_link)) {
        errors.reg_link = `Registration Link must be a valid URL`;
    }


    if (!isEmpty(errors)) {
        return res.status(400).json(errors);
    }

    next();

};



module.exports = {
    validateNewEvent
};