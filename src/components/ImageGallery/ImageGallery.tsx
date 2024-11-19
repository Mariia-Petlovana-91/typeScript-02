import css from '../ImageGallery/ImageGallery.module.css';
import { UnsplashImage } from '../../types';
import ImageCard from '../ImageCard/ImageCard';

interface ImageGalleryProps {
    array: UnsplashImage[];
    onImgClick: (image: UnsplashImage) => void;
}

export default function ImageGallery({ array, onImgClick }: ImageGalleryProps) {
    return (
        <ul className="image-gallery">
            {array.map((ar) => (
                <li key={ar.id}>
                    <ImageCard img={ar} onImgClick={onImgClick} />
                </li>
            ))}
        </ul>
    );
}