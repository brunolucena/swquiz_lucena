import React from 'react';


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

export default Container;