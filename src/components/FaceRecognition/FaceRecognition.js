import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, faceCapture }) => {
	return (
		<div className="d-flex justify-content-center">
		   <div className="position-absolute border border-3  border-danger rounded-bottom border-top-0 shawdow-sm">
			    <img id="img" alt="" src={ imgUrl } width="500" height="auto"/>
				 <div 
				 	className="bounding-box" 
				 	style={{ 
				 			top: faceCapture.top, 
				 			bottom: faceCapture.bottom, 
				 			right: faceCapture.right, 
				 			left: faceCapture.left
				 		}}>
				 </div>
			</div>
		</div>
	);
}

export default FaceRecognition;