Small node.js Api Skeleton with basic authentication and user registration.
Uses Postgresql.

Uses ES6 Modules, add --experimental-modules to package.json

Folders:

    src
    │   app.js          # App entry point
    └───api             # Express route controllers for all the endpoints of the app
    └───config          # Environment variables and configuration related stuff
    └───jobs            # Jobs definitions for agenda.js
    └───loaders         # Split the startup process into modules
    └───models          # Database models
    └───services        # All the business logic is here
    └───subscribers     # Event handlers for async task


Used some ideas from https://github.com/santiq/bulletproof-nodejs