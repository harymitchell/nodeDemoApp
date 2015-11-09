# nodeDemoApp
Demo app using node.js, express, mongodb, and more. Public facing here: http://arcane-hollows-8416.herokuapp.com/

# Getting Started

## Packages
To build locally, clone or unzip.  Run npm install to get all needed packages.

## MongoDB
1. Install Mongo on your machine  
2. Build DB by issuing command: mongod --dbpath [path-to-node-app]\data
3. Run db_setup.js.

## Run the app
Issue command "npm start"

# Application Summary
This web app is a very basic demonstration of a number of web development concepts:

## Authentication
Users can authenticate using Google Plus, and a user is created in DB when logging in for first time.

## GET
Listings and Users can be read from the database.
User's shopping cart is viewable from the home page when logged in.

## PUT
Listings and Users can be added to the database.
Listings can be added to a User's shopping cart.

## DELETE
Listings and Users can be deleted from the database.

## Session management
This is mostly done using express-session.

## Markup Templating
Uses jade templates, which allow embedded of code and control flow to build html.

## APIs
Logged in users have their Google Plus image displayed.

## Database Engine
Uses MongoDB for now. 

## ODM
Mongoose used for schemas and models.

## Sockets
Socket.io is used in the chat module of this app. 

## Package Management
Node package management is very simple.  All needed packages are in the package.json.  Run npm install to fetch.
