import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			goToNextPage: PropTypes.func.isRequired, // Function to go to next page
			goToPreviousPage: PropTypes.func.isRequired, // Function to go to previous page
			hasNext: PropTypes.bool.isRequired, // Has next page
			hasPrevious: PropTypes.bool.isRequired // Has previous page
		};

		constructor(props) {
			super(props);

			this.state = {};
		}

		render() {
			return <Component {...this.props} {...this.state} />
		}
	}
)

export default Container;