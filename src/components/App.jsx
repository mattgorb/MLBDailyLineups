import React from 'react';
import {Content} from './Content.jsx';

class App extends React.Component {
   render() {
      return (
	<div className="container">
	    <div className="navbar-spacer"></div>
	    <nav className="navbar">
	      <div className="container">
		<ul className="navbar-list">
			<li className="navbar-item" ><a className="navbar-link" style={{fontWeight: 700}} href="#intro">Intro</a></li>
			<li className="navbar-item"><a className="navbar-link" href="#json">Json Response</a></li>
			<li className="navbar-item"><a className="navbar-link" href="#games">Games</a></li>
			<li className="navbar-item"><a className="navbar-link" href="#client">Client</a></li>
		</ul>
	      </div>
	    </nav>
	    <Content/>
	    
	</div>
      );
   }
}








export default App;











