import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
  const { id } = useParams();
  const pastes = useSelector((s) => s.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  if (!paste) return <div className="p-6">Paste not found.</div>;

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste.title ?? ""}
          disabled
          className="w-full text-black border rounded-md p-2"
        />
        <div className="w-full flex flex-col items-start rounded border">
          <div className="w-full flex items-center justify-between gap-x-4 px-4 py-2 border-b">
            <div className="w-full flex gap-x-2 items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>
            <button
              className="flex justify-center items-center transition-all"
              onClick={() => {
                navigator.clipboard.writeText(paste.content ?? "");
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          <textarea
            value={paste.content ?? ""}
            disabled
            placeholder="Write Your Content Here..."
            className="w-full p-3 focus-visible:ring-0"
            style={{ caretColor: "#000" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
}
