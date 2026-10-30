/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Search, ShieldCheck, ShieldAlert, Ban } from "lucide-react";

// Admin only page: add your role guard so moderators cannot open it.

const Users = () => (
  <>
    <header>
      <h1 className="font-display text-3xl font-bold">Users</h1>
      <p className="mt-1 text-ink-soft">
        Manage members, moderators and admins.
      </p>
    </header>

    <div className="mt-6 flex flex-wrap gap-3">
      <div className="relative min-w-64 flex-1">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          type="search"
          placeholder="Search by name or email"
          className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3"
        />
      </div>
      <select className="rounded-md border border-line bg-white px-3 py-2.5">
        <option>All roles</option>
        <option>Admin</option>
        <option>Moderator</option>
        <option>User</option>
      </select>
    </div>

    <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[820px] text-left text-[15px]">
        <thead className="border-b border-line bg-moss-50 text-sm text-ink-soft">
          <tr>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Role</th>
            <th className="px-5 py-3 font-medium">Verified</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Joined</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">Abdullah Rahman</td>
            <td className="px-5 py-4 text-ink-soft">abdullah@example.com</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-moss-900 px-2.5 py-0.5 text-sm text-white">Admin</span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5 text-moss-700">
                <ShieldCheck size={16} /> Verified
              </span>
            </td>
            <td className="px-5 py-4">Active</td>
            <td className="px-5 py-4 text-ink-soft">01 Jan 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <select aria-label="Change role" className="rounded-md border border-line bg-white px-2 py-1.5 text-sm">
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>User</option>
                </select>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">
                  <Ban size={15} /> Ban
                </button>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">Fatima Akter</td>
            <td className="px-5 py-4 text-ink-soft">fatima@example.com</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-moss-100 px-2.5 py-0.5 text-sm text-moss-900">Moderator</span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5 text-moss-700">
                <ShieldCheck size={16} /> Verified
              </span>
            </td>
            <td className="px-5 py-4">Active</td>
            <td className="px-5 py-4 text-ink-soft">14 Mar 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <select aria-label="Change role" className="rounded-md border border-line bg-white px-2 py-1.5 text-sm">
                  <option>Moderator</option>
                  <option>Admin</option>
                  <option>User</option>
                </select>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">
                  <Ban size={15} /> Ban
                </button>
              </div>
            </td>
          </tr>

          <tr className="hover:bg-moss-50/60">
            <td className="px-5 py-4 font-semibold">Hasan Mahmud</td>
            <td className="px-5 py-4 text-ink-soft">hasan@example.com</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-sm text-gold-600">User</span>
            </td>
            <td className="px-5 py-4">
              <span className="inline-flex items-center gap-1.5 text-ink-soft">
                <ShieldAlert size={16} /> Unverified
              </span>
            </td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm text-red-700">Banned</span>
            </td>
            <td className="px-5 py-4 text-ink-soft">09 Aug 2026</td>
            <td className="px-5 py-4">
              <div className="flex justify-end gap-2">
                <select aria-label="Change role" className="rounded-md border border-line bg-white px-2 py-1.5 text-sm">
                  <option>User</option>
                  <option>Moderator</option>
                  <option>Admin</option>
                </select>
                <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm hover:bg-moss-50">
                  Unban
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-sm text-ink-soft">
        <span>Showing 1–3 of 3 users</span>
        <div className="flex gap-2">
          <button type="button" className="rounded-md border border-line px-3 py-1.5 hover:bg-moss-50">Previous</button>
          <button type="button" className="rounded-md border border-line px-3 py-1.5 hover:bg-moss-50">Next</button>
        </div>
      </div>
    </div>
  </>
);

export default Users;
