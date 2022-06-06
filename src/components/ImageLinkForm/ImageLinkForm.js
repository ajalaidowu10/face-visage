import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ inputChange, buttonSubmit }) => {
	return (
		<div id="image-link-form">
			<p className="fs-6">
				{'	Face Visage will detect faces in your pictures. Git it a try'}
			</p>

			<div className="col col-md-6 mx-5 m-md-auto p-5 border border-3 border-dark border-opacity-50 shadow-lg rounded-3">
				<div className="input-group bg-white rounded">
			      <input type="text" className="form-control" placeholder="Enter Face URL" onChange={ inputChange }/>
			      <button className="input-group-text px-5 btn btn-outline-danger" onClick={ buttonSubmit } >Detect</button>
			    </div>
			</div>
		</div>
	);
}

export default ImageLinkForm;