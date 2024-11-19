import css from '../ImageModal/ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { SlLike } from "react-icons/sl";
import { UnsplashImage } from '../../types';

interface ImageModalProps {
  img: {
    full: string;
    alt_description: string | null;
    likes: number;
    links: string;
    userFirstName: string;
    userLastName: string;
  };
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ImageModal({ isOpen,
  onRequestClose,
  img,
}:ImageModalProps) {

  return (
    <Modal
      ariaHideApp={false}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Item Details"
      overlayClassName={css.modalOverlay}
    ><div className={css.modalCloseEl}>
        <button
          type='button'
          onClick={onRequestClose}
          className={css.modalCloseBtn}
        >❌
        </button>
        <img
        className={css.modalImg}
        src={img.full}
        alt={img.alt_description  || "photo"}
        />
      </div>
      <div className={css.modalAboutEl}>
        <p className={css.modalAuthorText}>
          <strong>
          Author: &#8201;
           </strong>
          {img.userFirstName}&#8201;
          {img.userLastName}
        </p>
          <p className={css.modalLikes}>
           <SlLike
            className={css.modalIcon}
            size={24}
            aria-label="Likes"
           />  &#8201;
           &#8201;{img.likes}
         </p>
	       <a href={img.links || '#'}
		       target="_blank"
		       rel="noopener noreferrer"
		       className={css.modalLink}>
          View the whole picture
         </a>
        </div>
    </Modal>
  );
};
