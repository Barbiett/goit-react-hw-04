import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import * as Yup from "yup";
export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const UserSchema = Yup.object().shape({
    query: Yup.string()
      .trim()
      .min(3, "Too Short")
      .max(50, "Max 50 letters!")
      .required("Is required"),
  });
  function handleSearch(newQuery) {
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
      <SearchBar onSearch={handleSearch} UserSchema={UserSchema} />
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
