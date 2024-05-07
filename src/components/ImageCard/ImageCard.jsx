export default function ImageCard({ photo: { urls, alt_description, likes } }) {
  return (
    <div>
      <img src={urls.small} alt={alt_description} />
      <p>Likes: {likes}</p>
    </div>
  );
}
