import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { SettingsCard } from "./Card";

export function DeleteAccountSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    if (confirmText !== "DELETE") {
      toast.error("Please type 'DELETE' to confirm.");
      return;
    }
    // Mock API call
    console.log("Deleting account");
    toast.success("Account deletion requested!");
    setIsModalOpen(false);
    setConfirmText("");
  };

  return (
    <SettingsCard
      title="Delete Account"
      description="Permanently delete your account and all data."
    >
      <div className="space-y-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            px-4 py-2 rounded-lg text-sm font-semibold
            bg-red-500 text-white hover:bg-red-600
            transition-colors
          "
        >
          Delete Account
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg max-w-md w-full space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Confirm Account Deletion
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                This action is irreversible. Type "DELETE" to confirm.
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="
                  w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-700
                  text-neutral-900 dark:text-neutral-200 border border-neutral-300
                  dark:border-neutral-600 focus:outline-none focus:ring-2
                  focus:ring-red-500
                "
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="
                    flex-1 px-4 py-2 rounded-lg text-sm
                    text-neutral-600 dark:text-neutral-300
                    hover:bg-neutral-200 dark:hover:bg-neutral-700
                    transition-colors
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="
                    flex-1 px-4 py-2 rounded-lg text-sm font-semibold
                    bg-red-500 text-white hover:bg-red-600
                    transition-colors
                  "
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