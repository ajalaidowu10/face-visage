import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn){
		return(
				<nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
					<button type="button" className="btn btn-link text-danger p-3 " onClick={() => onRouteChange('signout')}>Sign out</button>
				</nav>
	);
	}else{
		return(

				<nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
					<button type="button" className="btn btn-link text-danger p-3 " onClick={() => onRouteChange('home')}>Sign in</button>
					<button type="button" className="btn btn-link text-danger p-3 " onClick={() => onRouteChange('signup')}>Sign up</button>
				</nav>
			);
	}
}

export default Navigation;