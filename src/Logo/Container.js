import React from 'react';

import PropTypes from 'prop-types';

import darthVader from '../images/darth-vader.jpg'


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			imageUrl: PropTypes.string,
			type: PropTypes.string // horizontal or vertical
		};

		static defaultProps = {
			imageUrl: darthVader,
			type: 'vertical'
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