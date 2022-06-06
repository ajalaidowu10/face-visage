import React from 'react';

const FaceRecognition = ({ imgUrl }) => {
	return (
		<div className="m-3">
			 <img alt="" src={ imgUrl } width="500" height="auto"/>
		</div>
	);
}

export default FaceRecognition;