import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Validator from '../Validator/Validator';
import logoImg from '../Logo/logo.png';
import './Signin.css'
const facevisage_api = process.env.REACT_APP_FACE_VISAGE_API;

class Signin extends Component{
	constructor(){
		super();
		this.state = {
			form: {email: '', password: ''},
			errors: {}
		}
	}
	onChange = (field, event) => {
		let form = this.state.form;
		    form[field] = event.target.value;
		    this.setState({ form });
	}
	onSubmitForm = () => {
		let validator = Validator(this.state.form);
		if(validator.formIsValid){
			const { email, password } = this.state.form;
			fetch(`${facevisage_api}/signin`, {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ email, password })
			})
			.then(res => res.json())
			.then(user => {
				if (user.status === 200) {
					this.props.onRouteChange('home', user.data);
				}else{
					this.setState({errors: user.data.errors });
				}
			})
			.catch(err => {
				console.log('An API error occured')
			})
		}else{
			this.setState({errors: validator.errors });
		}
		
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
									<div className="mb-3">
										<div className="input-group">
											<span className="input-group-text bg-danger">
												<FontAwesomeIcon icon={['fas', 'envelope']} />
											</span>
											<input 
												type="email" 
												name="email" 
												className="form-control input_user" 
												placeholder="email"  
												onChange={this.onChange.bind(this, 'email')}
												/>
										</div>
										<div className="text-danger">{this.state.errors["email"]}</div>
									</div>
									<div className="mb-2">
										<div className="input-group">
											<span className="input-group-text bg-danger">
												<FontAwesomeIcon icon={['fas', 'lock']} />
											</span>
											<input 
												type="password" 
												name="password" 
												className="form-control input_pass" 
												placeholder="password" 
												onChange={this.onChange.bind(this, 'password')}
											/>
										</div>
										<div className="text-danger">{this.state.errors["password"]}</div>
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