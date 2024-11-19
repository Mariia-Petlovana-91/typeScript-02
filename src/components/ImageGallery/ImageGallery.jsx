import css from '../ImageGallery/ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';


export default function ImageGallery({ array, onImgClick }) {


	return (
		<ul className={css.list}>
			{Array.isArray(array) && array.map((ar) => (
				<li
					className={css.item}
					key={ar.id}
				>
					<ImageCard 
						urls={ar.urls}
						alt_description={ar.alt_description} 
						onImgClick={() => onImgClick(ar)}
						
					/>
				</li>
			))}
		</ul>
	);
}
