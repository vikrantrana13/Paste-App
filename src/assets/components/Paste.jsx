// src/assets/components/Paste.jsx
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../../redux/pasteslice";
import { FormatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

export default function Paste() {
  const pastes = useSelector((s) => s.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = pastes.filter((p) =>
    (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
    {/* Search */}
    <div className="w-full flex gap-3 px-4 py-2 
                    rounded-md border border-neutral-700 
                    bg-white/60 dark:bg-neutral-900/60 
                    backdrop-blur">
    <input
        type="search"
        placeholder="Search paste here..."
        className="w-full bg-transparent border-none outline-none 
                focus:outline-none focus:ring-0 
                text-black dark:text-white 
                placeholder-neutral-500 dark:placeholder-neutral-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>


      {/* All Pastes */}
      <div className="mt-6">
        <h2 className="text-3xl font-bold mb-4">All Pastes</h2>

        <div className="flex flex-col gap-5">
          {filtered.length > 0 ? (
            filtered.map((paste) => (
              <div
                key={paste._id}
                className="rounded-xl overflow-hidden
                           border border-neutral-300 dark:border-white/15
                           bg-white dark:bg-neutral-950
                           shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
              >
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2
                                bg-neutral-100/80 dark:bg-neutral-900/70
                                border-b border-neutral-300 dark:border-white/10
                                backdrop-blur">
                  <div className="flex items-center gap-2 select-none">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Edit (goes to Home with ?pasteId=) */}
                    <Link
                      to={`/?pasteId=${paste._id}`}
                      className="w-8 h-8 grid place-items-center rounded-md
                                 border border-neutral-300 dark:border-white/15
                                 text-neutral-700 dark:text-neutral-200
                                 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <PencilLine size={16} className="text-current" />
                    </Link>

                    {/* View */}
                    <Link
                      to={`/pastes/${paste._id}`}
                      target="_blank"
                      className="w-8 h-8 grid place-items-center rounded-md
                                 border border-neutral-300 dark:border-white/15
                                 text-neutral-700 dark:text-neutral-200
                                 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      title="Open"
                      aria-label="Open"
                    >
                      <Eye size={16} className="text-current" />
                    </Link>

                    {/* Copy */}
                    <button
                      className="w-8 h-8 grid place-items-center rounded-md
                                 border border-neutral-300 dark:border-white/15
                                 text-neutral-700 dark:text-neutral-200
                                 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content || "");
                        toast.success("Copied to Clipboard");
                      }}
                      title="Copy"
                      aria-label="Copy"
                    >
                      <Copy size={16} className="text-current" />
                    </button>

                    {/* Delete */}
                    <button
                      className="w-8 h-8 grid place-items-center rounded-md
                                 border border-neutral-300 dark:border-white/15
                                 text-neutral-700 dark:text-neutral-200
                                 hover:bg-black/5 dark:hover:bg-white/5 transition"
                      onClick={() => {
                        dispatch(removeFromPastes(paste._id));
                        toast.success("Deleted");
                      }}
                      title="Delete"
                      aria-label="Delete"
                    >
                      <Trash2 size={16} className="text-current" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-semibold truncate">{paste.title}</p>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
                      {paste.content}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-neutral-700 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {FormatDate(paste.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-neutral-600 dark:text-neutral-300">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
