Modules
=

All Modules reside in this Directory

Configuration
=

Modules are dynamically loaded on application startup.
To enable a Module add its import path to modules.json

Implementation
=
Every Module has to extend ModuleInterface and implement a method init() and a method routes().
The init() is used to initialize your module.
The routes() is called by the express loader to add api routes for you module

Also if there is a file called acl.json it will be loaded by MethodInterface and appended to global ACL for role-based authorization.

Module-local dependencies should be added to package.json in the module folder.

All the rest is on you. 

API Path
=
Modules are connected to the path defined in modules.json
All Modulepaths reside under /module/ route.
