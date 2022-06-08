import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div id="image-link-form">
			<p className="fs-6 mx-3">
				{'	Face Visage will detect faces in your pictures. Git it a try'}
			</p>

			<div className="col col-md-6 mx-3 m-md-auto p-2 p-md-5 border border-3 border-dark border-opacity-50 shadow-lg rounded-top">
				<div className="input-group bg-white rounded">
			      <input type="text" className="form-control" placeholder="Enter Face URL" onChange={ onInputChange }/>
			      <button className="input-group-text px-2 px-md-5 btn btn-outline-danger" onClick={ onButtonSubmit } >Detect</button>
			    </div>
			</div>
		</div>
	);
}

export default ImageLinkForm;