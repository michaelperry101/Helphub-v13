export default function ReviewCard({ review }) {
  return (
    <div className="card review">
      <div className="review-head">
        <strong>{review.name}</strong>
        <span className="stars">{'★★★★★'.slice(0, review.rating)}</span>
      </div>
      <p>{review.text}</p>
    </div>
  );
}
