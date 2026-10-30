/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Youtube } from "lucide-react";

const CreateNaat = () => (
  <>
    <header>
      <h1 className="font-display text-3xl font-bold">Create naat</h1>
      <p className="mt-1 text-ink-soft">Add a new naat to Bangla Naat.</p>
    </header>

    <form className="mt-6 max-w-3xl rounded-lg border border-line bg-white p-6 sm:p-8">
      <label className="block text-sm font-medium" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Naat title"
        className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5"
      />

      <label className="mt-6 block text-sm font-medium" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5"
      >
        <option value="">Select a category</option>
        <option>Hamd</option>
        <option>Naat</option>
        <option>Gojol</option>
      </select>

      <label className="mt-6 block text-sm font-medium" htmlFor="youtubeUrl">
        YouTube URL
      </label>
      <div className="relative mt-1.5">
        <Youtube
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          id="youtubeUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3"
        />
      </div>

      <label className="mt-6 block text-sm font-medium" htmlFor="content">
        Content
      </label>
      <textarea
        id="content"
        rows={12}
        placeholder="Write the naat lyrics here"
        className="mt-1.5 w-full resize-y rounded-md border border-line bg-white px-3 py-2.5 leading-7"
      />

      <div className="mt-8 flex justify-end gap-3 border-t border-line pt-6">
        <button
          type="reset"
          className="rounded-md border border-line px-5 py-2.5 text-sm font-medium hover:bg-moss-50"
        >
          Clear form
        </button>
        <button
          type="submit"
          className="rounded-md bg-moss-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-moss-900"
        >
          Publish naat
        </button>
      </div>
    </form>
  </>
);

export default CreateNaat;
