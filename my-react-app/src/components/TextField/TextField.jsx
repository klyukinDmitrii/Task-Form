import styles from './TextField.module.css';

export const TextField = ({  id, error, ...props }) => {
	return (

			<div className={styles.input}>
				<div>
				   {error && <span className={styles.black}>{error}</span>}
			    </div>
				   <input type="text" id={id} {...props} />
			</div>
	);
};
