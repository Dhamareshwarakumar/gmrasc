import React from 'react'

const AdminCard = props => {
    const roles = ['Super Admin', 'Admin', 'Member', 'Guest'];
    return (
        <div className="card bg-light text-dark mb-3 border-secondary">
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-3">
                            <img src="/img/businessman.png" alt="Avatar" height="120px" />
                        </div>
                        <div className="col-8">
                            <div className="card-title">{props.username}</div>
                            <div className="badge bg-primary rounded-pill">{roles[props.role]}</div>
                        </div>
                        <div className="col-1">
                            <button className='btn btn-danger' onClick={() => props.handleDelete(props.username)}><i className="bi bi-archive-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCard