import css from '../ImageModal/ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { SlLike } from "react-icons/sl";

export default function ImageModal({ isOpen,
  onRequestClose,
  img,
  alt,
  likes,
  links,
  userFirstName,
  userLastName }) {

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
        src={img}
        alt={alt}
        />
      </div>
      <div className={css.modalAboutEl}>
        <p className={css.modalAuthorText}>
          <strong>
          Author: &#8201;
           </strong>
          {userFirstName}&#8201;
          {userLastName}
        </p>
          <p className={css.modalLikes}>
           <SlLike
            className={css.modalIcon}
            size={24}
            aria-label="Likes"
           />  &#8201;
           &#8201;{likes}
         </p>
	       <a href={links?.download || '#'}
		       target="_blank"
		       rel="noopener noreferrer"
		       className={css.modalLink}>
          View the whole picture
         </a>
        </div>
    </Modal>
  );
};
