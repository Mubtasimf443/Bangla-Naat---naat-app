/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Heart } from "lucide-react";

const Naats = () => (
  <>
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Naats</h1>
        <p className="mt-1 text-ink-soft">All naats published on Bangla Naat.</p>
      </div>
      <Link
        to="/naats/create"
        className="inline-flex items-center gap-2 rounded-md bg-moss-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-moss-900"
      >
        <Plus size={17} />
        Create naat
      </Link>
    </header>

    <div className="mt-6 flex flex-wrap gap-3">
      <div className="relative min-w-64 flex-1">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          type="search"
          placeholder="Search by title or author"
          className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3"
        />
      </div>
      <select className="rounded-md border border-line bg-white px-3 py-2.5">
        <option>All categories</option>
        <option>Hamd</option>
        <option>Naat</option>
        <option>Gojol</option>
      </select>
    </div>

    <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[760px] text-left text-[15px]">
        <thead className="border-b border-line bg-moss-50 text-sm text-ink-soft">
          <tr>
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Author</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Likes</th>
            <th className="px-5 py-3 font-medium">Created</th>
            <th className="px-5 py-3 font-medium">Updated</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">ইয়া নবী সালাম আলাইকা</td>
            <td className="px-5 py-4">Admin Name</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-sm text-gold-600">
                Naat
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5">
                <Heart size={15} className="text-gold-600" /> 128
              </span>
            </td>
            <td className="px-5 py-4 text-ink-soft">12 Oct 2026</td>
            <td className="px-5 py-4 text-ink-soft">20 Oct 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <button type="button" aria-label="Edit naat" className="rounded-md border border-line p-2 text-ink-soft hover:bg-moss-50">
                  <Pencil size={16} />
                </button>
                <button type="button" aria-label="Delete naat" className="rounded-md border border-line p-2 text-red-700 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">তালা আল বাদরু আলাইনা</td>
            <td className="px-5 py-4">Moderator Name</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-sm text-gold-600">
                Hamd
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5">
                <Heart size={15} className="text-gold-600" /> 84
              </span>
            </td>
            <td className="px-5 py-4 text-ink-soft">02 Oct 2026</td>
            <td className="px-5 py-4 text-ink-soft">02 Oct 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <button type="button" aria-label="Edit naat" className="rounded-md border border-line p-2 text-ink-soft hover:bg-moss-50">
                  <Pencil size={16} />
                </button>
                <button type="button" aria-label="Delete naat" className="rounded-md border border-line p-2 text-red-700 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">মরু কাননের ফুল</td>
            <td className="px-5 py-4">Admin Name</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-sm text-gold-600">
                Gojol
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5">
                <Heart size={15} className="text-gold-600" /> 51
              </span>
            </td>
            <td className="px-5 py-4 text-ink-soft">25 Sep 2026</td>
            <td className="px-5 py-4 text-ink-soft">28 Sep 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <button type="button" aria-label="Edit naat" className="rounded-md border border-line p-2 text-ink-soft hover:bg-moss-50">
                  <Pencil size={16} />
                </button>
                <button type="button" aria-label="Delete naat" className="rounded-md border border-line p-2 text-red-700 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-sm text-ink-soft">
        <span>Showing 1–3 of 3 naats</span>
        <div className="flex gap-2">
          <button type="button" className="rounded-md border border-line px-3 py-1.5 hover:bg-moss-50">Previous</button>
          <button type="button" className="rounded-md border border-line px-3 py-1.5 hover:bg-moss-50">Next</button>
        </div>
      </div>
    </div>
  </>
);

export default Naats;
