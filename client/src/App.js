import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
// redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import { Routes } from './components/routing/Routes'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route component={Routes} />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
