import css from '../ImageCard/ImageCard.module.css';
import { UnsplashImage } from '../../types';

interface ImageCardProps{
	img: UnsplashImage;
	onImgClick: (image: UnsplashImage) => void;
}



export default function ImageCard({ img,onImgClick}:ImageCardProps) {
	return (
		<>
			<img className={css.img}
				src={img.urls.small}
				alt={img.alt_description || "image"}
				onClick={() => onImgClick(img)}

			/>
		</>
	);
}
