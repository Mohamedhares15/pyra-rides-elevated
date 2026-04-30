import type { Review } from "@/lib/types";
import { StarRating } from "@/components/ui/star-rating";
import { formatDate } from "@/lib/format";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-t hairline pt-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {review.riderAvatar ? (
            <img src={review.riderAvatar} alt={review.riderName} className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <div className="h-11 w-11 rounded-full bg-surface" />
          )}
          <div>
            <h4 className="font-display text-lg text-foreground">{review.riderName}</h4>
            <p className="text-xs ink-muted">
              {review.stableName}
              {review.horseName && ` · rode ${review.horseName}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <StarRating value={review.stableRating} size="sm" />
          <p className="mt-1 text-[11px] ink-muted">{formatDate(review.createdAt)}</p>
        </div>
      </div>
      <p className="mt-5 text-base ink-soft leading-relaxed font-display italic">
        &ldquo;{review.comment}&rdquo;
      </p>
      {review.mediaUrls && review.mediaUrls.length > 0 && (
        <div className="mt-5 flex gap-2">
          {review.mediaUrls.map((u, i) => (
            <img key={i} src={u} alt="" loading="lazy" className="h-20 w-20 rounded-sm object-cover" />
          ))}
        </div>
      )}
    </article>
  );
}
