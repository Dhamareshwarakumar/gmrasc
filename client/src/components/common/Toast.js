import React from 'react'

const Toast = props => {
    return (

        <div className={"alert alert-" + props.type + " alert-dismissible fade show"} role="alert">
            {props.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Toast