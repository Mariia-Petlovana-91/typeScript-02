import { useEffect, useState } from 'react';
import './App.module.css';
import getDataImages from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import Section from '../Section/Section';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [imagesArray, setImagesArray] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [load, setLoad] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
  
  async function fetchImages(searchValue, pageNumber) {
    try {
     setLoad(true);
     const data = await getDataImages(searchValue, pageNumber);
     if (data.results.length === 0) {
      setErrorMessage(true);
      setLoaderBtn(false);
      return;
    }
    setImagesArray((prevImages) => prevImages ? [...prevImages, ...data.results] : data.results);
    setLoaderBtn(pageNumber < data.total_pages);
   } catch (error) {
     toast.error(`${error.message}🚨`);
   } finally {
     setLoad(false);
    }
  }
  
  useEffect(() => {
    if (searchTerm) {
      fetchImages(searchTerm, page);
    }
  }, [searchTerm, page]);

  function onSearchSubmit(inputValue) {
    setSearchTerm(inputValue);
    setImagesArray([]);
    setPage(1);
    setErrorMessage(false);
  }

  function onClickLoadeMore() {
    setPage((prevPage) => prevPage + 1);
  }
  
  function openModal(ar) {
    setSelectedImage(ar);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  function onImgClick(ar) {
    if (selectedImage && selectedImage.id === ar.id) {
      closeModal();
    } else {
      openModal(ar);
    }
  }

  useEffect(() => {
  if (modalIsOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  return () => {
    document.body.style.overflow = 'auto';
  };
  }, [modalIsOpen]);
  
  return (
    <>
      <Section>
        <SearchBar
          onSubmit={onSearchSubmit}
        />
        {load && <Loader />}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
        <ImageGallery array={imagesArray}
                onImgClick={onImgClick}
         />
        {loaderBtn &&
          <LoadMoreBtn
            onSearchNext={onClickLoadeMore}
          />}
        {errorMessage && <ErrorMessage />}

        			{selectedImage && (
				<ImageModal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					img={selectedImage.urls.regular}
					alt={selectedImage.alt_description}
					likes={selectedImage.likes}
					links={selectedImage.links}
					userFirstName={selectedImage.user.first_name}
					userLastName={selectedImage.user.last_name}
				/>
			)}
      </Section>
    </>
  );
}
