import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onSearchNext }) {
	return (
		<div className={css.load__container}>
			<button className={css.load__btn}
				type="button"
				onClick={ onSearchNext }>LOAD MORE</button>
		</div>
	)
}