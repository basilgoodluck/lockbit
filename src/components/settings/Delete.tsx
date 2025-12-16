import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function DeleteAccountSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    if (confirmText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm.");
      return;
    }
    console.log("Deleting account");
    toast.success("Account deletion requested!");
    setIsModalOpen(false);
    setConfirmText("");
  };

  const handleCloseModal = () => {
    if (confirmText && confirmText !== "DELETE") {
      const confirmed = window.confirm("Are you sure you want to cancel?");
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
    <SettingsCard
      title="Delete Account"
      description="Permanently delete your account and all associated data"
    >
      <div className="space-y-4">
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-lg">
          <p className="text-sm text-rose-700 dark:text-rose-400">
            <strong>Warning:</strong> This action cannot be undone. All your files, encryption keys, and account data will be permanently deleted.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Trash2 size={16} />
          Delete Account
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center">
                      <Trash2 size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        Delete Account
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                        This action is permanent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3">
                  <p className="text-sm text-amber-900 dark:text-amber-300">
                    You are about to permanently delete your account. This will erase all your data including:
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-amber-800 dark:text-amber-400 ml-4 list-disc">
                    <li>All uploaded files</li>
                    <li>Encryption keys and passwords</li>
                    <li>Account settings and preferences</li>
                    <li>Activity history</li>
                  </ul>
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-900 dark:text-white block mb-2">
                    Type <span className="text-rose-600 dark:text-rose-400 font-mono">DELETE</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                    className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="bg-neutral-50 dark:bg-neutral-900 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 px-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirmText !== "DELETE"}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-all ${
                    confirmText === "DELETE"
                      ? "bg-rose-600 hover:bg-rose-700 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed opacity-50"
                  }`}
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}
