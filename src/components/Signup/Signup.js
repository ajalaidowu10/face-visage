import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImg from '../Logo/logo.png';
import '../Signin/Signin.css'
const facevisage_api = process.env.REACT_APP_FACE_VISAGE_API;

class Signin extends Component{
	constructor(){
		super();
		this.state = {
						username: '',
						email: '',
						password:'',
		}
	}
	onChangeUsername = (event) => {
		this.setState({username: event.target.value});
	}
	onChangeEmail = (event) => {
		this.setState({email: event.target.value});
	}
	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	}
	onSubmitForm = () => {
		const { username, email, password } = this.state;
		fetch(`${facevisage_api}/users`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({username, email, password})
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
			<div id="signin" className="d-flex justify-content-center h-100">
						<div className="user_card">
							<div className="d-flex justify-content-center">
								<div className="brand_logo_container">
									<img src={logoImg} className="brand_logo" alt="Logo" />
								</div>
							</div>
							<div className="d-flex justify-content-center form_container">
								<form>
									<h5 className="text-danger fw-bold my-3">Sign up</h5>
									<div className="input-group mb-3">
										<span className="input-group-text bg-danger">
											<FontAwesomeIcon icon={['fas', 'user']} />
										</span>
										<input type="text" name="username" onChange={this.onChangeUsername} className="form-control input_user" placeholder="username"/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-text bg-danger">
											<FontAwesomeIcon icon={['fas', 'envelope']} />
										</span>
										<input type="email" name="email" onChange={this.onChangeEmail} className="form-control input_user" placeholder="email"/>
									</div>
									<div className="input-group mb-2">
										<span className="input-group-text bg-danger">
											<FontAwesomeIcon icon={['fas', 'lock']} />
										</span>
										<input type="password" name="password" onChange={this.onChangePassword} className="form-control input_pass" placeholder="password"/>
									</div>
									<div className="d-flex justify-content-center mt-3 mb-5">
							 		 <button 
							 		 		type="button" 
							 		 		name="button" 
							 		 		className="btn login_btn"
							 		 		onClick={this.onSubmitForm}
							 		 	>Sign up</button>
							     </div>
								</form>
							</div>
						</div>
					</div>
		);
	}
}

export default Signin;