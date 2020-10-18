import React, { useState, useEffect } from 'react';
import { updateObject, checkValidity, checkMatch } from '../../utility';
import { useHistory } from "react-router";


const Form = () => {
	const history = useHistory();
	const [name, setName] = useState({
		placeholder: 'your name',
		value: '',
		validation: {
			required: true,
			alphabeticOnly: true,
		},
		valid: false,
		touched: false,
	});
	const [email, setEmail] = useState({
		placeholder: 'your email',
		value: '',
		validation: {
			required: true,
			isEmail: true,
		},
		valid: false,
		touched: false,
	});
	const [password, setPassword] = useState({
		value: '',
		placeholder: 'password',
		validation: {
			required: true,
			minLength: 6,
		},
		valid: true,
		touched: false,
	});

	const [repeatPassword, setRepeatPassword] = useState({
		value: '',
		placeholder: 'repeat password',
		validation: {
			required: true,
		},
		valid: true,
		touched: false,
	});
	const [formInvalid, setFormInvalid] = useState(false);
	const [errorMessages, setErrorMessages] = useState({
		nameError: '',
		emailError: '',
		passwordError: '',
		repeatPasswordError: '',
	});
	const [passwordHidden, setPasswordHidden] = useState(true);

	const inputChangedHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		switch (property) {
			case 'name':
				setName((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'email':
				setEmail((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'password':
				setPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'repeatPassword':
				setRepeatPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
		}
	};

	const checkValidFields = () => {
		let errors = 0;
		if (!checkValidity(name.value, name.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, nameError: 'Enter your name' };
			});
		}
		if (!checkValidity(email.value, email.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, emailError: 'Enter a valid email address' };
			});
		}
		if (!checkValidity(password.value, password.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return {
					...prev,
					passwordError: 'Passwords must be at least 6 characters',
				};
			});
		}
		if (!checkMatch(repeatPassword.value, password.value)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, repeatPasswordError: 'Passwords must match' };
			});
		}
		if (errors) return false;
		else return true;
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (checkValidFields()) {
			history.push({
				pathname: '/success',
				state: { name: name.value, email: email.value, password: password.value }
			})
		} else {
			setFormInvalid(true);
		}
	};

	let displayError = null;
	let displaySuccess = null;

		if (formInvalid) {
			const arrayOfErrors = [];
			for (const property in errorMessages) {
				arrayOfErrors.push(errorMessages[property]);
			}
			displayError = (
				<div>
					<h5>There was a problem</h5>
					<ul>
						{arrayOfErrors.map((msg) => {
							if (msg.length) return <li key={msg}>{msg}</li>;
						})}
					</ul>
				</div>
			);

		}

	return (
		<div>
			{formInvalid ? displayError : null}
			<form onSubmit={submitHandler}>
				<label htmlFor='name'>Your name:</label>
				<br />
				<input
					type='text'
					name='name'
					value={name.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<br />
				<label htmlFor='email'>Email:</label>
				<br />
				<input
					type='email'
					name='email'
					value={email.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<br />
				<label htmlFor='password'>Password:</label>
				<br />
				<input
					type='password'
					name='password'
					value={password.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<br />
				<label htmlFor='repeatPassword'>Repeat password:</label>
				<br />
				<input
					type='password'
					name='repeatPassword'
					value={repeatPassword.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default Form;
