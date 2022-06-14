import React from 'react';

const Rank = ({ userData }) => {
	return (
		<div>
			<div className="fs-5 text-danger mx-3">
				Hi <span className="text-black fw-bold">{userData.username}</span>, your current rank is
			</div>

			<div className="fs-4">
				{`#${userData.entries}`}
			</div>
		</div>
	);
}

export default Rank;