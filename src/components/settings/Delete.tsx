// Delete.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, AlertTriangle } from "lucide-react";
import { SettingsCard } from "./SettingsCard";
export function DeleteAccountSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const handleDelete = () => {
    if (confirmText !== "DELETE") {
      toast.error("Type 'DELETE' to confirm.");
      return;
    }
    console.log("Deleting account");
    toast.success("Deletion requested!");
    setIsModalOpen(false);
    setConfirmText("");
  };
  const handleCloseModal = () => {
    if (confirmText && confirmText !== "DELETE") {
      const confirmed = window.confirm("Cancel?");
      if (confirmed) {
        setIsModalOpen(false);
        setConfirmText("");
      }
    } else {
      setIsModalOpen(false);
      setConfirmText("");
    }
  };
  return (
    <SettingsCard title="Delete Account">
      <div className="space-y-3">
        <div className="p-3 border border-neutral-300 dark:border-neutral-700 rounded-md">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-neutral-600 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Permanent: All data deleted
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <Trash2 size={14} />
          Delete
        </button>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 border border-neutral-300 dark:border-neutral-700 rounded flex items-center justify-center">
                    <Trash2 size={20} className="text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                      Delete Account
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Permanent action
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="border border-neutral-300 dark:border-neutral-700 rounded-md p-2">
                  <p className="text-xs text-neutral-900 dark:text-white mb-1">
                    Deletes:
                  </p>
                  <ul className="space-y-0.5 text-xs text-neutral-600 dark:text-neutral-400 ml-3 list-disc">
                    <li>Files</li>
                    <li>Keys/passwords</li>
                    <li>Settings</li>
                    <li>History</li>
                  </ul>
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-900 dark:text-white block mb-1">
                    Type <span className="font-mono">DELETE</span>
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                    className="w-full px-3 py-1.5 bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-md text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
                  />
                </div>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 flex gap-2">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-1.5 px-3 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirmText !== "DELETE"}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium ${
                    confirmText === "DELETE"
                      ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}