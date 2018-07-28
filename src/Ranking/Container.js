import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			data: PropTypes.arrayOf(PropTypes.shape({ // Data to display at the ranking
				email: PropTypes.string,
				name: PropTypes.string,
				score: PropTypes.number
			})).isRequired
		};

		constructor(props) {
			super(props);

			this.state = {};

			this.data = props.data.sort((a, b) => {
				if (a.score > b.score) {
					return -1;
				}
				if (a.score < b.score) {
					return 1
				}
				return 0
			});
		}

		render() {
			return <Component {...this.props} {...this.state} games={this.data} />
		}
	}
)

export default Container;