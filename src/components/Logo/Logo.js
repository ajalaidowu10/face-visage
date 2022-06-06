import React from 'react';
import Tilt from 'react-tilt';
import logoImg from './logo.png';
import './logo.css';

const Logo = () => {
	return (
		<div className="m-1 ms-5 d-flex align-items-md-start align-items-center flex-column">
			<Tilt className="Tilt rounded shadow-sm d-flex justify-content-center align-items-center border border-1" options={{ max : 30 }} style={{ height: 100, width: 100 }} >
			 <div className="Tilt-inner">
			 	<img alt="logo" src={logoImg}/>
			 </div>
			</Tilt>
			<p className="px-2 fw-semibold">Face Visage</p>
		</div>
	);
}

export default Logo;