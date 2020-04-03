if (process.env.NODE_ENV !== 'production') require('dotenv').config()
require('./database/db')()
const path = require('path')
const express = require('express')
const app = express()
// Connect Database
// Init Middleware
app.use(express.json({ extended: false }))
const PORT = process.env.PORT || 5000

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// Serve static assets in prod
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html '))
	})
}
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
