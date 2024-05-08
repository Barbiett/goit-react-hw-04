import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import * as Yup from "yup";

// import ImageModal from "../ImageModal/ImageModal";
// import Modal from "react-modal";
export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showReset, setShowReset] = useState(false);
  // ============= Modal Window.

  // const [isMounted, setMounted] = useState(false);

  // const [modalIsOpen, setIsOpen] = useState(false);
  // const [modalData, setModalData] = useState(null);
  // Modal.setAppElement("#root");

  // function openModal(photo) {
  //   setModalData(photo);
  //   setIsOpen(true);
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }
  // ====================
  const UserSchema = Yup.object().shape({
    query: Yup.string()
      .trim()
      .min(3, "Too Short")
      .max(50, "Max 50 letters!")
      .required("Is required"),
  });
  function handleReset() {
    setShowReset(false);
    setPhotos([]);
  }
  function handleSearch(newQuery) {
    setShowReset(true);
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  }

  function handleLoadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getGallery() {
      try {
        setError(false);
        setIsLoading(true);

        const data = await fetchGallery(query, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getGallery();
  }, [page, query]);

  return (
    <div>
      {/* {modalIsOpen && modalData && (
        <ImageModal
          isModalOpen={modalIsOpen}
          closeModal={closeModal}
          modalData={modalData}
          openModal={openModal}
        />
      )} */}

      <SearchBar
        onSearch={handleSearch}
        UserSchema={UserSchema}
        onClickReset={handleReset}
        showReset={showReset}
      />

      <ImageGallery photos={photos} />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}

      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
