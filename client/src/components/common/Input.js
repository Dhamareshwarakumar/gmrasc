import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const Input = ({
    type,
    name,
    placeholder,
    value,
    error,
    onChange,
    label
}) => {
    return (
        <>
            {label !== "" && (<label htmlFor={name} className="form-label">{label}</label>)}
            <div className="input-group mb-3">
                <input
                    type={type}
                    className={classnames(
                        'form-control', {
                        'is-invalid': error
                    }
                    )}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                />
                {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
        </>
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

Input.defaultProps = {
    type: 'text'
}


export default Input