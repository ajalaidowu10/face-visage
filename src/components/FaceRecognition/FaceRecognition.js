import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, faceCapture }) => {
	return (
		<div className="d-flex justify-content-center">
		   <div className="position-absolute border border-3  border-danger rounded-bottom border-top-0 shawdow-sm mx-3">
			    <img id="img" alt="" src={ imgUrl } width="500" height="auto"/>
			    {
			    	faceCapture.map((capture, i) => 
			    		(
			    			<div 
				    			key={i}
				    			className="bounding-box" 
				    			style={{ 
				    					top: capture.top, 
				    					bottom: capture.bottom, 
				    					right: capture.right, 
				    					left: capture.left
				    				}}>
			    			</div>
			    		)
			    	)
			    }
			</div>
		</div>
	);
}

export default FaceRecognition;