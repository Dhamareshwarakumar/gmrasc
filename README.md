# GMRIT ACM Student Chapter

## Description

    This application will be useful for the STUDENT CHAPTERS in Engineering Colleges. Committee members can use this application to post info about their upcoming events and monitor user registrations. Chapter members can use this application to pay and renew their membership fee and get track of their activities. Common users can use this application to register for events

## Terminology

-   **Student Chapter:** It is a community of students completely driven by students working towards a common goal by organizing seminars, workshops, hackathons which benefits their peers.
-   **Committee Members:** Office Bearers who maintains the chapter and organize events
-   **Members:** Students who supports the chapter

## Tech Stack

-   **Database:** MongoDB
-   **Frontend:** ReactJS
-   **Backend:** ExpressJS
-   **Server:** NodeJS
-   **Deployment:** Heroku

## Key Features

-   CRUD Operations
-   Authentication
-   Email Sending
-   Payment Gateway

# Test Credentials

## Super Admin

    username: 18341A0537@gmrit.edu.in
    password: iamsuperadmin

## Admin

    username: 18341A0512@gmrit.edu.in
    password: iamadmin

# API Info

## 1. Admin API

| Route                         | Info               | Permission  |
| ----------------------------- | ------------------ | ----------- |
| GET `/api/admin/`             | Get List of Admnis | Super Admin |
| POST `/api/admin`             | Admin Login        | Public      |
| PUT `/api/admin/:username`    | Update Password    | Self Admin  |
| DELETE `/api/admin/:username` | Delete an Admin    | Super Admin |
| POST `/api/admin/createAdmin` | Create Admin       | Super Admin |

## 2. Events API

| Route                    | Info                   | Permission |
| ------------------------ | ---------------------- | ---------- |
| GET `/api/events`        | Get List of all events | Public     |
| GET `/api/events/:id`    | Get particular event   | Public     |
| POST `/api/events`       | Create new event       | Admin      |
| PUT `/api/events/:id`    | Update an event        | Admin      |
| DELETE `/api/events/:id` | Delete an event        | Admin      |

# Mongoose Setup

## 1. Dependencies Required

    a) mongoose

## 2. Configuration

```javascript
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log(`MongoDB Connected`))
    .catch((err) => console.error(`Error Connecting Database :: ${err}`));
```

## 3. CRUD Operations

    Add later

# Passport Setup (JWT)

## 1. Dependencies required

    passport
    passport-jwt
    jsonwebtoken

## 2. Configuration

```Javascript
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;


    // Import Models
    const Admin = require('../models/Admin');

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_KEY;


    module.exports = passport => {
        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            if (jwt_payload.role === 0) {
                // User is Super Admin
                Admin.findOne({ username: jwt_payload.username })
                    .then(admin => {
                        if (admin) {
                            const user = {
                                id: admin._id,
                                username: admin.username,
                                role: admin.role
                            };
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    })
                    .catch(err => done(err, false));
            } else if (jwt_payload.role === 1) {
                // User id Admin
            } else if (jwt_payload.role === 2) {
                // User is a Member
            } else if (jwt_payload.role === 3) {
                // User is a Guest
            } else {
                // User is not recognized
                return done(null, false);
            }
        }));
    }
```

# Axios Setup

## 1. Dependencies Required

    a) axios

## 2. Configuration

```javascript
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
```

# Redux Setup

## 1. Dependencies Required

    a) redux
    b) react-redux
    c) redux-thunk

## 2. app.js

```javascript
    a) import { Provider } from 'react-redux'
    b) Wrap everything with Provider
    c) Provide store to Provider
```

## 3. Creating Store

```javascript
const middleware = [thunk];

const store = createStore(
    () => rootReducer,
    {},
    applyMiddleware(...middleware)
);
```

## 4. Root Reducer

```javascript
    a) Create index.js in reducers folder
    b) import all reducers

    export default combineReducers({
        name: nameReducer
    });
```

## 5. Reducer

```javascript
const initialState = {
    isAuthenticated: false,
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
```

## 6. Dev Tools

```javascript
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
```

## 7. Actions

```javascript
export const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData,
    };
};
```

## 8. Connecting Components to redux store

```javascript
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { testDispatch })(AdminLogin);
```

## 9. Setting Current User

```javascript
    <!-- action -->
    const decoded = jwt_token(token)
    dispatch(setCurrentUser(decoded))

    const setCurrentUser = decoded => {
        return {
            type: SET_CURRENT_USER,
            payload: decoded
        }
    }
```
