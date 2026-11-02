import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function SubmitConfirmModal({
  exam,
  sections,
  questions,
  questionStates,
  onConfirmSubmit,
  onCancel
}) {
  // Compute section-wise stats
  const sectionStats = sections.map((sec) => {
    const secQuestions = questions.filter((q) => q.sectionId === sec.id);
    const stats = {
      name: sec.name,
      total: secQuestions.length,
      answered: 0,
      not_answered: 0,
      marked_review: 0,
      answered_marked_review: 0,
      not_visited: 0,
    };

    secQuestions.forEach((q) => {
      const st = questionStates[q.id] || 'not_visited';
      if (stats[st] !== undefined) {
        stats[st]++;
      } else {
        stats.not_visited++;
      }
    });

    return stats;
  });

  // Overall totals
  const overall = sectionStats.reduce(
    (acc, curr) => ({
      total: acc.total + curr.total,
      answered: acc.answered + curr.answered,
      not_answered: acc.not_answered + curr.not_answered,
      marked_review: acc.marked_review + curr.marked_review,
      answered_marked_review: acc.answered_marked_review + curr.answered_marked_review,
      not_visited: acc.not_visited + curr.not_visited,
    }),
    { total: 0, answered: 0, not_answered: 0, marked_review: 0, answered_marked_review: 0, not_visited: 0 }
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-300 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1e3c72] text-white px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sm md:text-base">
            <AlertCircle className="w-5 h-5 text-amber-300" />
            <span>Exam Summary Confirmation</span>
          </div>
          <button
            onClick={onCancel}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 text-xs text-gray-800 space-y-4">
          <p className="text-gray-600 font-medium">
            Please review your attempt summary across all examination sections before final submission:
          </p>

          <div className="overflow-x-auto border border-gray-300 rounded shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-gray-700 font-bold border-b border-gray-300 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Section Name</th>
                  <th className="py-2.5 px-2 text-center">Total Qs</th>
                  <th className="py-2.5 px-2 text-center bg-emerald-50 text-emerald-800">Answered</th>
                  <th className="py-2.5 px-2 text-center bg-rose-50 text-rose-800">Not Answered</th>
                  <th className="py-2.5 px-2 text-center bg-purple-50 text-purple-800">Marked for Review</th>
                  <th className="py-2.5 px-2 text-center bg-violet-50 text-violet-800">Ans & Marked</th>
                  <th className="py-2.5 px-2 text-center">Not Visited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {sectionStats.map((st, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-gray-900">{st.name}</td>
                    <td className="py-2 px-2 text-center">{st.total}</td>
                    <td className="py-2 px-2 text-center font-bold text-emerald-600">{st.answered}</td>
                    <td className="py-2 px-2 text-center font-bold text-rose-600">{st.not_answered}</td>
                    <td className="py-2 px-2 text-center font-bold text-purple-600">{st.marked_review}</td>
                    <td className="py-2 px-2 text-center font-bold text-violet-700">{st.answered_marked_review}</td>
                    <td className="py-2 px-2 text-center text-gray-500">{st.not_visited}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-gray-300 text-gray-900">
                  <td className="py-2 px-3">Grand Total</td>
                  <td className="py-2 px-2 text-center">{overall.total}</td>
                  <td className="py-2 px-2 text-center text-emerald-700">{overall.answered}</td>
                  <td className="py-2 px-2 text-center text-rose-700">{overall.not_answered}</td>
                  <td className="py-2 px-2 text-center text-purple-700">{overall.marked_review}</td>
                  <td className="py-2 px-2 text-center text-violet-800">{overall.answered_marked_review}</td>
                  <td className="py-2 px-2 text-center text-gray-600">{overall.not_visited}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-3 rounded text-amber-900 text-xs">
            <strong>Important:</strong> Questions marked <em>"Answered and Marked for Review"</em> will be counted in your final score evaluation. Unanswered questions will receive 0 marks.
          </div>

          <p className="font-semibold text-gray-800 text-center pt-2">
            Are you sure you want to submit your test? You will not be able to change your responses after submission.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-gray-300 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors shadow-xs"
          >
            NO, RETURN TO TEST
          </button>
          <button
            onClick={onConfirmSubmit}
            className="px-6 py-2 rounded text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>YES, SUBMIT TEST</span>
          </button>
        </div>
      </div>
    </div>
  );
}
