import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Star, CheckCircle, EyeOff, Trash2 } from 'lucide-react';

export const Reviews = () => {
  const { reviews, updateReviewStatus, deleteReview } = useApp();

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="WEBSITE MANAGEMENT"
        title="Reviews & Testimonials"
        subtitle="Moderate patient reviews, star ratings, and website testimonial showcases."
      />

      {/* Review Cards List */}
      <div className="space-y-4">
        {(reviews || []).map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={rev.avatar}
                alt={rev.patientName}
                className="w-12 h-12 rounded-full object-cover border border-gold/50 flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl font-bold text-obsidian">
                    {rev.patientName}
                  </h3>
                  <Badge status={rev.status} />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-gold text-gold'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rev.rating}.0 / 5.0
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-semibold">{rev.service} • {rev.date}</p>

                <p className="text-xs text-slate-800 leading-relaxed italic bg-[#FAF8F5] p-3 rounded-2xl border border-[#F1ECE5] mt-2">
                  "{rev.reviewText}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              {rev.status !== 'Published' ? (
                <button
                  onClick={() => updateReviewStatus && updateReviewStatus(rev.id, 'Published')}
                  className="px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Publish to Website</span>
                </button>
              ) : (
                <button
                  onClick={() => updateReviewStatus && updateReviewStatus(rev.id, 'Hidden')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide from Showcase</span>
                </button>
              )}

              <button
                onClick={() => deleteReview && deleteReview(rev.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Delete Testimonial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
