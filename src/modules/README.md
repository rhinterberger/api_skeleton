Modules
=

All Modules reside in this Directory

Configuration
=

Modules are dynamically loaded on application startup.
To enable a Module add its import path to modules.json

Implementation
=
Every Modules has to implement a constructor() and a function routes().
The constructor is used to initialize your module.
The routes() function is called by the express loader to add api routes for you module

Module-local dependencies should be added to package.json in the module folder.

All the rest is on you. 

API Path
=
Modules are connected to the path defined in [module].path.
All Modulepaths reside under /module/ route.
