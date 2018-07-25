import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {};
const defaultProps = {};

const Container = (Component) => (
	class extends React.Component {
		static propTypes ={
			birthYear: PropTypes.string,
			eyeColor: PropTypes.string,
			films: PropTypes.arrayOf(PropTypes.string),
			gender: PropTypes.string,
			hairColor: PropTypes.string,
			height: PropTypes.string,
			homeworld: PropTypes.string,
			imageUrl: PropTypes.string.isRequired,
			mass: PropTypes.string,
			skinColor: PropTypes.string,
			species: PropTypes.arrayOf(PropTypes.string),
			starships: PropTypes.arrayOf(PropTypes.string),
			vehicles: PropTypes.arrayOf(PropTypes.string)
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

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;