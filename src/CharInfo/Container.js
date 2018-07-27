import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {};
const defaultProps = {};

const Container = (Component) => (
	class extends React.Component {
		static propTypes ={
			birth_year: PropTypes.string,
			eye_color: PropTypes.string,
			films: PropTypes.arrayOf(PropTypes.shape({
				title: PropTypes.string
			})),
			gender: PropTypes.string,
			hair_color: PropTypes.string,
			height: PropTypes.string,
			homeworld: PropTypes.shape({
				name: PropTypes.string
			}),
			imageUrl: PropTypes.string.isRequired,
			mass: PropTypes.string,
			skin_color: PropTypes.string,
			species: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string
			})),
			starships: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string
			})),
			vehicles: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string
			})),
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