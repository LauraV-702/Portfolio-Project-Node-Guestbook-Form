// Get the express package 
const express = require('express');

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'guestbook'
});

// Instantiate an express (web) app
const app = express();
// Define a port number for the app to listen on
const PORT = 3000;

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error conneting to DB: ' + err);
    }
}

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');
// Serve static files (e.g., CSS) from the 'public' folder
app.use(express.static('public'));


// Define a "default" route, 
// e.g. jshmo.greenriverdev.com/reservation-app/
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");
    // Return home page
    res.render('home');
});

// Define a "confirm" route, using the POST method
app.post('/confirm', async (req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    const data = req.body;
    console.log(data);
    data.mailinglist = !data.mailinglist ? false : true;
    console.log(data);
    const conn = await connect();
    await conn.query(
        `INSERT INTO guestbook_entries (
            firstname, 
            lastname, 
            jobname, 
            company, 
            linkedin, 
            email, 
            meet_method, 
            other_meet_method, 
            message, 
            mailing_list, 
            email_format
        )
        VALUES (
            '${data.firstname}', 
            '${data.lastname}', 
            '${data.jobname}', 
            '${data.company}', 
            '${data.linkedin}', 
            '${data.email}', 
            '${data.meet_method}', 
            '${data.other_meet_method}', 
            '${data.message}', 
            ${data.mailinglist}, 
            '${data.email_format}'
        )
    `);
    // Display the confirm page, pass the data
    res.render('confirmations', { details: data });
});

// Define a route to display all entries in the admin page
app.get('/admin', async (req, res) => {
    const conn = await connect();
    try {
        // Query to get all guestbook entries ordered by 'created_at'
        const rows = await conn.query('SELECT * FROM guestbook_entries ORDER BY created_at DESC');
        res.render('admin', { entries: rows });
    } catch (err) {
        console.log('Error retrieving data from the database:', err);
    }
});


// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
