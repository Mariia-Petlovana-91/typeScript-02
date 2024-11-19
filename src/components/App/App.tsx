import { useEffect, useState ,FormEvent} from 'react';
import './App.module.css';
import getDataImages from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { UnsplashImage } from '../../types';
import Section from '../Section/Section';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [imagesArray, setImagesArray] = useState<UnsplashImage[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  
  async function fetchImages(searchValue:string, pageNumber:number) {
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
   } catch (error:unknown) {
     toast.error("Fetch error 🚨");
   } finally {
     setLoad(false);
    }
  }
  
  useEffect(() => {
    if (searchTerm) {
      fetchImages(searchTerm, page);
    }
  }, [searchTerm, page]);

  function onSearchSubmit(e: FormEvent<HTMLFormElement>, inputValue: string): void {
    e.preventDefault;
    setSearchTerm(inputValue);
    setImagesArray([]);
    setPage(1);
    setErrorMessage(false);
  }

  function onClickLoadeMore() {
    setPage((prevPage) => prevPage + 1);
  }
  
  function openModal(ar:UnsplashImage) {
    setSelectedImage(ar);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  function onImgClick(ar:UnsplashImage) {
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
        {imagesArray && onImgClick && (
         <ImageGallery 
          array={imagesArray} 
          onImgClick={onImgClick} 
         />
        )}
        {loaderBtn &&
          <LoadMoreBtn
            onSearchNext={onClickLoadeMore}
          />}
        {errorMessage && <ErrorMessage />}
        {selectedImage && (
          <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          img={{
            full: selectedImage.urls.full,
            alt_description: selectedImage.alt_description,
            likes: selectedImage.likes,
            links: selectedImage.links,
            userFirstName: selectedImage.user.first_name,
            userLastName: selectedImage.user.last_name
            }}
           />
        )}
      </Section>
    </>
  );
}
