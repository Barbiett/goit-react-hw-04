import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ photos }) {
  return (
    <ul className={css.list}>
      {photos.map((photo) => (
        <li key={photo.id}>
          <ImageCard photo={photo} />
        </li>
      ))}
    </ul>
  );
}
