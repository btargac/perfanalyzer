This project consists of three different packages combined in a monorepo structure; <br/>
Api, Client and Dashboard.

# @perfanalyzer/api

A Nodejs - Expressjs based metrics API for both collecting data from client's browsers and serving collected data
- uses mongoose mongo adapter to db query and crud operations
- tested for heavy loads on local with `wrk -t8 -c8 -d20s` a cli tool and average 600 RPS with a local mongo db setup with startDate and endDate values

### Available Scripts in api folder
- build: generate a minified production version of the app, ready to run with node
- build:analyze: generate the production output and analyze what was included to distribution
- start: start webpack to watch and build a bundled version of app, which then can be run with `nodemon ./dist/server.js`

# @perfanalyzer/client

A utility library that collects metrics like TTFB, FCP, DCL, LOAD and Network Timing data for static assets

### Available Scripts in client folder
- build: generate a minified production version of the client library, ready to run in a browser like <script src='...>
- build:analyze: generate the production output and analyze what was included to distribution
- start: start webpack to watch and build a bundled version of library, which then can be run browsers

# @perfanalyzer/dashboard

A component based React app, created with CRA and RTK best pratices, which differs from a standart Redux app with store creation,
reducer function structure and built in Immer library that makes reducer functions immutable data flow in a seamless way.

Dashboard has two routes,
- Landing page
   - Initial load duration is shortened with chunk splitting with react lazy,
   - A small animation not to bore the visitors
   - A call to action button to send the user to real purpose of Dashboard
- Metrics page
    - Built with hooks such as useState useEffect and useDispatch
    - On component mount data is fetched with no query parameters
    - Initial metrics are fetched with last 30 minutes without any query parameters at the endpoint
    - Since initial load is made with last 30 minutes the Datepicker shows what startDate was used to get the metrics
    - API response is then mapped to a graphic library "Nivo" for line charts and a bar chart for network timings

### Available Scripts in dashboard folder
Since CRA was used as an initial setup CRA scripts are also valid here

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!


## Deployment
For local development you can use Docker Compose <br/>
( no need to install Node, npm, mongoDB or create-react-app etc. )

### `docker-compose up`
will build docker images for each package (API and Dashboard)

### Deploy to Heroku
#### Dashboard

`cd dashboard/` <br/>
`heroku container:login` <br/>
`heroku container:push web --app perfanalyzer-dashboard` <br/>
`heroku container:release web --app perfanalyzer-dashboard` <br/>

#### API

`cd api/` <br/>
`heroku container:login` <br/>
`heroku container:push web --app perfanalyzer-api` <br/>
`heroku container:release web --app perfanalyzer-api`

If you have speed luck with you then you should see the live version on
[🚀live version on herkou](https://perfanalyzer-dashboard.herokuapp.com/)

And don't forget since the Heroku Dyno is free it will be sleeping most of the time 💤

