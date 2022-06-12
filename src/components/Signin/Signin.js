import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImg from '../Logo/logo.png';
import './Signin.css'
const facevisage_api = process.env.REACT_APP_FACE_VISAGE_API;

class Signin extends Component{
	constructor(){
		super();
		this.state = {
			email: '',
			password: ''
		}
	}
	onChangeEmail = (event) => {
		this.setState({email: event.target.value});
	}
	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	}
	onSubmitForm = () => {
		const { email, password } = this.state;
		fetch(`${facevisage_api}/signin`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ email, password })
		})
		.then(res => res.json())
		.then(user => {
			if (user.status === 200) {
				this.props.onRouteChange('home', user.data);
			}
		})
	}
	render(){
		return (
			<div id="signin" className="d-flex justify-content-center align-content-center h-100">
						<div className="user_card">
							<div className="d-flex justify-content-center">
								<div className="brand_logo_container">
									<img src={logoImg} className="brand_logo" alt="Logo" />
								</div>
							</div>
							<div className="d-flex justify-content-center form_container">
								<form>
									<h5 className="text-danger fw-bold my-3">Sign in</h5>
									<div className="input-group mb-3">
										<span className="input-group-text bg-danger">
											<FontAwesomeIcon icon={['fas', 'envelope']} />
										</span>
										<input type="email" name="email" className="form-control input_user" placeholder="email"  onChange={this.onChangeEmail}/>
									</div>
									<div className="input-group mb-2">
										<span className="input-group-text bg-danger">
											<FontAwesomeIcon icon={['fas', 'lock']} />
										</span>
										<input type="password" name="password" className="form-control input_pass" placeholder="password" onChange={this.onChangePassword}/>
									</div>
									<div className="d-flex justify-content-center mt-3">
							 		 <button 
							 		 		type="button" 
							 		 		className="btn login_btn"
							 		 		onClick={this.onSubmitForm}
							 		 	>Sign in</button>
							    </div>
								</form>
							</div>
					
							<div className="my-3 mx-0">
								<div className="d-flex justify-content-center">
									Don't have an account? <button type="button" className="btn btn-link text-danger m-0 p-0" onClick={() => this.props.onRouteChange('signup')}>Sign Up</button>
								</div>
							</div>
						</div>
					</div>
		);
	}
}

export default Signin;