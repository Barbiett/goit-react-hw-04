import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  function handleSearch(newQuery) {
    setQuery(newQuery);
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
        setIsLoading(true);
        const data = await fetchGallery(query, page);
        setPhotos((prevPhotos) => {
          // setPage((prevPage) => prevPage + 1);

          return [...prevPhotos, data];
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getGallery();
  }, [page, query]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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

      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn OnClick={handleLoadMore} />
      )}
    </div>
  );
}
