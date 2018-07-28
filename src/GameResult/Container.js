import React from 'react';
import PropTypes from 'prop-types';


const Container = (Component) => (
	class extends React.Component {
		static propTypes = {
			hasResult: PropTypes.bool.isRequired, // Game has a result
			loading: PropTypes.bool, // Is result beeing
			loadingMessage: PropTypes.string, // Message to display while loading
			playerEmail: PropTypes.string, // Email of player if game already has been saved
			playerName: PropTypes.string, // Name of player if game already has been saved
			saveGameData: PropTypes.func.isRequired, // Function to save game data
			score: PropTypes.number // Game score
		};

		static defaultProps = {
			loadingMessage: 'Calculando pontuação...'
		};

		constructor(props) {
			super(props);

			this.state = {
				email: '',
				formErrors: {email: '', name: ''},
				isFormValid: false,
				name: ''
			};

			this.handleInputChange = this.handleInputChange.bind(this);
			this.saveGameDataHandler = this.saveGameDataHandler.bind(this);
		}

		/**
		 * @description Changes input text and verifies if it's valid.
		 *
		 * @param {object} event Input
		 */
		handleInputChange(event) {
			event.preventDefault();

			const { formErrors } = this.state;

			const name = event.target.name;
			const value = event.target.value;

			const validator = this.validateField(name, value);

			if (!validator.valid) {
				formErrors[name] = validator.message;
			} else {
				formErrors[name] = '';
			}

			this.setState({
				formErrors,
				[name]: value
			});
		}

		saveGameDataHandler(event) {
			event.preventDefault();

			console.log('saveGameDataHandler', this.validateForm());
		}

		validateField(fieldName, value) {
			const validator = {
				valid: true,
				message: ''
			};

			switch (fieldName) {
				case 'email':
    				const emailFilter = /^.+@.+\..{2,}$/;
    				const illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/

					const isEmailValid = emailFilter.test(value) || value.match(illegalChars);

					validator.valid = isEmailValid;
					validator.message = isEmailValid ? '' : ' Invalid email';
					break;
				case 'name':
					const isNameValid = value.length > 0;

					validator.valid = isNameValid;
					validator.message = isNameValid ? '' : " Required";
					break;
				default:
					break;
		  	}

		  	return validator
		}

		validateForm() {
			const { formErrors } = this.state;

			Object.keys(formErrors).forEach(fieldName => {
				const value = formErrors[fieldName];

				const validator = this.validateField(fieldName, this.state[fieldName]);

				if (!validator.valid) {
					formErrors[fieldName] = validator.message;
				} else {
					formErrors[fieldName] = '';
				}
			});

			const errorsCount = Object.values(formErrors).filter(error => error.length > 1).length;
			let isFormValid = true;

			if (errorsCount > 0) {
				isFormValid = false;
			}

			this.setState({
				formErrors
			});

			return isFormValid
		}

		render() {
			return (
				<Component
					{...this.props}
					{...this.state}
					handleInputChange={this.handleInputChange}
					saveGameData={this.saveGameDataHandler}
				/>
			)
		}
	}
)

export default Container;