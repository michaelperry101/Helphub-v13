import reviews from '../../data/reviews.json';
import ReviewCard from '../../components/ReviewCard';

export const dynamic = 'force-static';

export default function Reviews({ searchParams }) {
  const page = Number(searchParams?.page ?? 1);
  const perPage = 12;
  const total = reviews.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = reviews.slice(start, start + perPage);

  const prev = Math.max(1, page - 1);
  const next = Math.min(pages, page + 1);

  return (
    <main className="doc">
      <h1>Customer Reviews</h1>
      <div className="review-grid">
        {items.map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
      <div className="pagi">
        <a className="btn" href={`?page=${prev}`}>Prev</a>
        <span>Page {page} / {pages}</span>
        <a className="btn" href={`?page=${next}`}>Next</a>
      </div>
    </main>
  );
}
