import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes ={
			birth_year: PropTypes.string,
			eye_color: PropTypes.string,
			films: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.string),
				PropTypes.arrayOf(PropTypes.shape({
					title: PropTypes.string
				})),
			]),
			gender: PropTypes.string,
			hair_color: PropTypes.string,
			height: PropTypes.string,
			homeworld: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.shape({
					name: PropTypes.string
				}),
			]),
			id: PropTypes.string,
			imageUrl: PropTypes.string,
			loadCharacterInfo: PropTypes.func, // Function to load char info
			mass: PropTypes.string,
			skin_color: PropTypes.string,
			species: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.string),
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
			]),
			starships: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.string),
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
			]),
			vehicles: PropTypes.oneOfType([
				PropTypes.arrayOf(PropTypes.string),
				PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string
				})),
			])
		};

		constructor(props) {
			super(props);

			this.state = {};
		}

		componentDidMount() {
			const { id, loadCharacterInfo } = this.props;

			loadCharacterInfo(id);
		}

		render() {
			return <Component {...this.props} {...this.state} />
		}
	}
)

export default Container;