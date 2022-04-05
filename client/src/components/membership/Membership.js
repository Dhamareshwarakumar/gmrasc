import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MembershipCard from './MembershipCard';

const Membership = () => {
    const [membershipPerks, setMembershipPerks] = useState([
        {
            text: "Subscription to ACM digital library",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/digital_library_logo.png"
        },
        {
            text: "Free Tutorials and Resourses from O'Reilly, Skillsoft, ScienceDirect",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/o_reilly_logo.png"
        },
        {
            text: "A full year online subscription to Communications of the ACM",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/communications_logo.png"
        },
        {
            text: "A full year subscription to XRDS: Crossroads, ACM's Student Magazine",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/xrds_logo.png"
        },
        {
            text: "A full year electronic subscription to monthly MemberNet newsletter & ACM Technews",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/technews_logo.png"
        },
        {
            text: "Discounts on subscriptions to ACM journals, magazines, books, and conferences.",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/acm_international_logo.png"
        },
        {
            text: "A free email forwarding address with high-quality spam filtering.",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/email_forwarding_logo.png"
        },
        {
            text: "Participation in ACM Distinguished Speakers Program(DSP)",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/dsp_logo.png"
        },
        {
            text: "Ubiquity and eLearn, IT Magazine and forum for students.",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/magazine_logo.png"
        },
    ]);

    const [localMembershipPerks, setLocalMembershipPerks] = useState([
        {
            text: "Concession on all events conducted by ACM-GMRIT",
            logo: "https://gmritchapter.acm.org/public/img/logos/membership/discount_logo.png"
        },
        {
            text: "To Equip students right information apart from the academic work",
            logo: "https://gmritchapter.acm.org/public/img/logos/acm.png"
        },
        {
            text: "Opportunity to host your portfolio on ACM GMRIT Website",
            logo: "https://gmritchapter.acm.org/public/img/logos/acm.png"
        },
    ])

    return (
        <div className="membership ">
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <h1 className='text-center my-5'>Perks of International Membership</h1>
                    {membershipPerks.map((perk, index) => (
                        <div className="col-auto col-md-4 p-2" key={index}>
                            <MembershipCard text={perk.text} logo={perk.logo} />
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center">
                    <h1 className='text-center my-5'>Perks of Local Membership</h1>
                    {localMembershipPerks.map((perk, index) => (
                        <div className="col-auto col-md-4 p-2" key={index}>
                            <MembershipCard text={perk.text} logo={perk.logo} />
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link to='/membership/checkout'>
                            <button type='button' className="btn btn-primary my-5 px-5">Take Membership</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership