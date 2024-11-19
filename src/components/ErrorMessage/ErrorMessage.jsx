import css from '../ErrorMessage/ErrorMessage.module.css';

export default function ErrorMessage() {
	return (
		<div className={css.ErrorMessage__container}>
			<p className={css.ErrorMessage__text}>Nothing was found for your request!🤷‍♀️</p>
		</div>
	)
}