const NAME_REGEX = /^[a-zA-Z0-9_ ,\(\)-.]{3,32}$/;
const PH_NO_REGEX = /^(\+91)?[6789][0-9]{9}$/;
const COLLEGE_REGEX = /^[-a-zA-Z0-9 .()]+$/;
const GMRIT_REGEX = /g ?m ?r ?i(nstitute)? ?(of)? ?t(echnology)?/i;
const CSE_REGEX = /^[Cc][-. ]?[Ss][-. ]?[Ee]$/;
const ECE_REGEX = /^[Ee][-. ]?[cC][-. ]?[Ee]$/;
const EEE_REGEX = /^[Ee][-. ]?[Ee][-. ]?[Ee]$/;
const IT_REGEX = /^[Ii][-. ]?[Tt]$/;
const JNTU_REGEX = /^[1-2][0-9]34[15]A[01][0-9A-Z]{3}$/i;
//FIXME: Update it for AI/ML branch


module.exports = {
    NAME_REGEX,
    PH_NO_REGEX,
    COLLEGE_REGEX,
    GMRIT_REGEX,
    CSE_REGEX,
    ECE_REGEX,
    EEE_REGEX,
    IT_REGEX,
    JNTU_REGEX
};