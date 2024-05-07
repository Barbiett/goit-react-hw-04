import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
// import ImageGallery from "../ImageGallery/ImageGallery";
export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  function handleSearch(newQuery) {
    setQuery(newQuery);
  }
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getGallery() {
      const data = await fetchGallery(query, page);
      setPhotos((prevPhotos) => {
        console.log(data);
        console.log(photos);
        setPage(page);
        return [...prevPhotos, data];
      });
    }
    getGallery();
  }, [page, query]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* <ImageGallery /> */}
    </div>
  );
}
