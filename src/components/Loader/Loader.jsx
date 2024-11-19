import css from '../Loader/Loader.module.css';
import { ThreeCircles } from 'react-loader-spinner';
export default function Loader() {
	return (
		<div className={css.load}>
			<ThreeCircles
                     visible={true}
                     height="40"
                     width="40"
                     color="white"
                     ariaLabel="three-circles-loading"
                     wrapperStyle={{}}
                     wrapperClass=""
                  />
		</div>
	)
}
