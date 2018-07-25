import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {};
const defaultProps = {};

const Container = (Component) => (
	class extends React.Component {

		constructor(props) {
			super(props);

			this.state = {};
		}

		render() {
			return <Component {...this.props} {...this.state} />
		}
	}
)

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;