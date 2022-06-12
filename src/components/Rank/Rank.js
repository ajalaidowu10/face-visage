import React from 'react';

const Rank = ({ userData }) => {
	return (
		<div>
			<div className="fs-6 text-danger mx-3">
				{`Hi ${userData.username}, your current rank is`}
			</div>

			<div className="fs-4">
				{`#${userData.entries}`}
			</div>
		</div>
	);
}

export default Rank;