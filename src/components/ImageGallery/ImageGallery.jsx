import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ photos }) {
  //   console.log(photos);
  return (
    <ul>
      {photos.map((photo) => {
        return (
          <li key={photo.id}>
            <ImageCard photo={photo} />
          </li>
        );
      })}
    </ul>
  );
}
