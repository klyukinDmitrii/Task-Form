import styles from "./app.module.css";
import { useStore } from "./hooks/useStore";
import { TextField } from "./components/TextField/TextField.jsx";
import { sendData, validateSchema, validate } from "./utils";
import { useEffect, useState, useRef } from "react";

export const App = () => {
	const { getState, updateState } = useStore();
	const { email, password, passwordRepeat } = getState();
	const [error, setError] = useState({});
	const isValid = Object.keys(error).length === 0;
	const buttonRef = useRef(null);

	function onSubmit(event) {
		event.preventDefault();
		sendData(getState());
	}

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	useEffect(() => {
		const error = validate(getState(), validateSchema);
		setError(error);
	}, [getState()]);

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	return (
		<>
			<form onSubmit={onSubmit} className={styles.app}>
				<TextField
					onChange={onChange}
					name={"email"}
					placeholder={"Введите почту"}
					id={"1"}
					error={error?.email}
					value={email}
				/>
				<TextField
					onChange={onChange}
					name={"password"}
					placeholder={"Введите пароль"}
					id={"2"}
					error={error?.password}
					value={password}
				/>
				<TextField
					onChange={onChange}
					name={"passwordRepeat"}
					placeholder={"Повторите Пароль"}
					id={"3"}
					error={error?.passwordRepeat}
					value={passwordRepeat}
				/>

				<button
					ref={buttonRef}
					disabled={!isValid}
					type="submit"
					className={styles.buttons}
				>
					Зарегистрироваться
				</button>
			</form>
		</>
	);
};
