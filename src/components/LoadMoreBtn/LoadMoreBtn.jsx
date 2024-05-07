export default function LoadMoreBtn({ Onclick }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button onClick={Onclick}>Load More</button>
    </div>
  );
}
