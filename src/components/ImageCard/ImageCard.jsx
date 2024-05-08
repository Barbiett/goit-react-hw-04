import css from "./ImageCard.module.css";
export default function ImageCard({
  photo: { urls, alt_description, likes, description, user },
}) {
  return (
    <div className={css.card}>
      <img src={urls.small} alt={alt_description} />
      <ul>
        <li>Likes: {likes}</li>
        <li>Description: {description}</li>
        <li>Creator: {user.name}</li>
        <li>Creator Instagram: {user.instagram_username}</li>
        <li>Creator Twitter: {user.twitter_username}</li>
      </ul>
    </div>
  );
}
