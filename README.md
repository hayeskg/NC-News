
# NC News

## Introduction

NC News is a platform for all things Northcoders related. It allows users to browse, sort and read articles, then comment or vote on them live. 

The site repository is available on GitHub: https://github.com/hayeskg/nc-news 

Front end application is hosted live on Netlify: https://hayeskg-nc-news.netlify.app/ 

Back end server is hosted live on: https://nc-news-hayeskg.herokuapp.com/

## Technologies used

* The front-end is built using ReactJS (https://reactjs.org/), a library for building user interfaces. 
* Reach is used for front-end routing (https://reach.tech/router).
* Axios takes care of the promise-based HTTP requests to the back-end (https://www.npmjs.com/package/axios). 
* Some styled components are used as part of the overall visual design (https://styled-components.com/).


The back-end for this application can be found here, with more detailed information: https://github.com/hayeskg/backend_nc_news.

It's an Express server built on NodeJS and PostgreSQL with a list of available API endpoints. It is hosted live on Heroku: https://nc-news-hayeskg.herokuapp.com/.

## Getting started

To run the NC News application on a local development machine, clone or fork the project from: https://github.com/hayeskg/nc-news. 

### Prerequisites 

ReactJS requires NodeJS to be installed locally, to download:

* NodeJS: https://nodejs.org/en/download/ 

### Run locally

After download, navigate to the directory and run the command:
```
npm i -D
```
This will install developer dependencies as outlined in the package.json file.

Once the dependencies are installed, only the following command will be needed:
```
npm start
```
This will start the server which will run locally on PORT 3000 - use client, like a browser to interact with the application.

## Authors

Kristof Hayes - Northcoders