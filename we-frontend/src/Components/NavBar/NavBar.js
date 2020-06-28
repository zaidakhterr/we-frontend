import React, { Component } from 'react';
import Logo from '../Logo/Logo.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Profile from '../Profile/Profile.js';
import SignOut from '../SignOut/SignOut.js';
import './NavBar.css'

class NavBar extends Component {
	render() {
		return (
			<div>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<nav className="zone">
			      <ul className="main-nav">
			      		<li><Logo /></li>
			        	<li><SearchBar /></li>
			        	<li><Profile /></li>
			        	<li><SignOut /></li>
				  </ul>
				</nav>
			</div>
		);
	}
}

export default NavBar;