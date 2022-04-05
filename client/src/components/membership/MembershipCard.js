import React from 'react';

const MembershipCard = ({ text, logo }) => {
    console.log(logo);
    return (
        <div className="membership-card">
            <div className="membership-card-logo" style={{ background: `url('${logo}') center / contain no-repeat` }}></div>
            <div className="membership-card-text text-justify p-4">{text}</div>
        </div>
    )
}

export default MembershipCard