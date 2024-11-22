import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onSearchNext: () => void;
}

export default function LoadMoreBtn({ onSearchNext }:LoadMoreBtnProps) {
	return (
		<div className={css.load__container}>
			<button className={css.load__btn}
				type="button"
				onClick={ onSearchNext }>LOAD MORE</button>
		</div>
	)
}