import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImg from '../Logo/logo.png';
import '../Signin/Signin.css'

const Signin = ({ onRouteChange }) => {
	return (
		<div id="signin" className="d-flex justify-content-center h-100">
					<div className="user_card">
						<div className="d-flex justify-content-center">
							<div className="brand_logo_container">
								<img src={logoImg} className="brand_logo" alt="Logo" />
							</div>
						</div>
						<div className="d-flex justify-content-center form_container">
							<form>
								<div className="input-group mb-3">
									<span className="input-group-text bg-danger">
										<FontAwesomeIcon icon={['fas', 'user']} />
									</span>
									<input type="text" name="" className="form-control input_user" placeholder="username"/>
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text bg-danger">
										<FontAwesomeIcon icon={['fas', 'envelop']} />
									</span>
									<input type="text" name="" className="form-control input_user" placeholder="email"/>
								</div>
								<div className="input-group mb-2">
									<span className="input-group-text bg-danger">
										<FontAwesomeIcon icon={['fas', 'lock']} />
									</span>
									<input type="password" name="" className="form-control input_pass" placeholder="password"/>
								</div>
								<div className="d-flex justify-content-center mt-3">
						 		 <button 
						 		 		type="button" 
						 		 		name="button" 
						 		 		className="btn login_btn"
						 		 		onClick={() => onRouteChange('home')}
						 		 	>Sign up</button>
						    </div>
							</form>
						</div>
					</div>
				</div>
	);
}

export default Signin;