// Importing modules:
// System modules:
const express = require('express');
const path = require('path');
// Libraries:
const exphbs = require('express-handlebars');
// Custom modules:
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Init middleware:
app.use(logger);

// Handlebars middleware:
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route:
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members,
}));

// Define static folder:
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for api:
app.use('/api/members', require('./routes/api/members'));


// Run the server:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));  