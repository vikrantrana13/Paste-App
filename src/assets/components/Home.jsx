import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addPaste, updatePaste } from "../../redux/pasteslice";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");

  const [searchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const navigate = useNavigate();

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createOrUpdate = () => {
    const isEditing = !!pasteId;
    const titleTrim = title.trim();
    const contentTrim = value.trim();

    if (!titleTrim && !contentTrim) {
      toast.error("Write something before saving", { position: "top-right" });
      return;
    }

    const existing = isEditing ? pastes.find((p) => p._id === pasteId) : null;
    if (
      isEditing &&
      existing &&
      existing.title === titleTrim &&
      existing.content === contentTrim
    ) {
      navigate("/", { replace: true });
      setTitle("");
      setValue("");
      toast("No changes to update", { position: "top-right" });
      return;
    }

    const payload = {
      _id: isEditing
        ? pasteId
        : Date.now().toString(36) + Math.random().toString(36).slice(2),
      title: titleTrim,
      content: contentTrim,
      createdAt:
        isEditing && existing ? existing.createdAt : new Date().toISOString(),
    };

    navigate("/", { replace: true });

    if (isEditing) {
      dispatch(updatePaste(payload));
      toast.success("Paste updated", { position: "top-right" });
    } else {
      dispatch(addPaste(payload));
      toast.success("Paste created", { position: "top-right" });
    }

    setTitle("");
    setValue("");
  };

  const reset = () => {
    navigate("/", { replace: true });
    setTitle("");
    setValue("");
  };

  useEffect(() => {
    if (!pasteId) {
      setTitle("");
      setValue("");
      return;
    }
    const p = pastes.find((x) => x._id === pasteId);
    if (p) {
      setTitle(p.title);
      setValue(p.content);
    }
  }, [pasteId]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        {/* TITLE + BUTTONS */}
        <div className="w-full flex gap-x-4 items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } font-sans text-sm
                bg-neutral-900 text-white
                placeholder-neutral-500
                rounded-md p-2 focus:outline-none`}
          />

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm px-5 py-2.5"
            onClick={createOrUpdate}
            disabled={!title.trim() && !value.trim()}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
              onClick={reset}
              title="Clear editor"
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        {/* EDITOR FRAME */}
        <div
          className="w-full rounded-xl overflow-hidden
                     border border-neutral-300 dark:border-white/15
                     bg-white dark:bg-neutral-950
                     shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-2
                       bg-neutral-100/80 dark:bg-neutral-900/70
                       border-b border-neutral-300 dark:border-white/10
                       backdrop-blur"
          >
            <div className="flex items-center gap-2 select-none">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            <button
              className="grid place-items-center w-8 h-8 rounded-md
                         border border-neutral-300 dark:border-white/15
                         text-neutral-700 dark:text-neutral-200
                         hover:bg-black/5 dark:hover:bg-white/5 transition"
              onClick={() => {
                navigator.clipboard.writeText(value || "");
                toast.success("Copied to Clipboard", {
                  position: "top-right",
                });
              }}
              aria-label="Copy content"
              title="Copy"
            >
              <Copy size={16} />
            </button>
          </div>

          {/* editor body with line numbers */}
          <div className="relative grid grid-cols-[48px,1fr]">
            {/* line numbers */}
            <pre
              className="select-none text-xs leading-6
                         text-neutral-500 dark:text-neutral-400
                         bg-neutral-50 dark:bg-neutral-950
                         border-r border-neutral-200 dark:border-white/10
                         px-3 py-3"
            >
              {Array.from({ length: (value?.split("\n").length || 1) })
                .map((_, i) => String(i + 1))
                .join("\n")}
            </pre>

            {/* textarea */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write Your Content Here..."
            className="w-full h-[56vh] resize-none p-3 font-sans text-sm
                    bg-transparent
                    text-black dark:text-white
                    placeholder-neutral-500 dark:placeholder-neutral-400
                    focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
