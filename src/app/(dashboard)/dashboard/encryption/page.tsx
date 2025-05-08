"use client";

import { FileUploader } from "@/components/FileUploader";
import { TextInput } from "@/components/TextInput";
import { EncryptionButton } from "@/components/EncryptionButton";
import { FilePreview } from "@/components/FilePreview";
import { useEncryption } from "@/hooks/useEncryption";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";

export default function EncryptionPage() {
  const {
    files,
    text,
    password,
    setFiles,
    setText,
    setPassword,
    encryptedResults,
    handleEncrypt,
    handleDecrypt,
  } = useEncryption();

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("File removed!");
  };
  
  const handleSetFiles = (newFiles: File[]) => {
    const uniqueFiles = newFiles.filter((newFile) => {
      const isDuplicate = files.some(
        (existingFile) =>
          existingFile.name === newFile.name &&
          existingFile.size === newFile.size &&
          existingFile.lastModified === newFile.lastModified
      );
      if (isDuplicate) {
        toast.error(`File "${newFile.name}" already uploaded!`);
        return false;
      }
      return true;
    });
    setFiles([...files, ...uniqueFiles]);
  };

  return (
    <div className="min-h-full bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Message (Optional)
              </label>
              <TextInput text={text} setText={setText} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Upload Files (Required)
              </label>
              <FileUploader
                files={files}
                setFiles={handleSetFiles}
                className="
                  flex bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 p-4 rounded-lg
                  hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors
                "
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Password
              </label>
              <div className="flex bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="p-3 flex-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 outline-none"
                  style={{
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    backgroundColor: "transparent",
                    WebkitTextFillColor: "inherit",
                    border: "inherit",
                    transition: "background-color 9999s ease-in-out 0s",
                  }}
                />
                <EncryptionButton
                  onEncrypt={handleEncrypt}
                  disabled={!files.length}
                  className="
                    cursor-pointer p-3 text-sm rounded-r-lg
                    bg-accent-500 text-white border-l border-neutral-300
                    dark:border-neutral-600 hover:bg-accent-600 focus:outline-none
                    focus:ring-2 focus:ring-accent-500
                  "
                />
              </div>
            </div>
          </div>
          {/* Right: Uploaded Files */}
          {files.length > 0 && (
            <div
              className="w-full md:w-1/2 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Opera */
                }
              `}</style>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Uploaded Files
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative max-w-40 h-48 bg-neutral-200 dark:bg-neutral-700 rounded-md shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 text-accent-500 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-600 cursor-pointer z-10"
                    >
                      <FaTimesCircle size={16} />
                    </button>
                    <div className="h-2/3 w-full">
                      <FilePreview file={file} />
                    </div>
                    <div className="h-1/3 flex items-center justify-center p-2">
                      <span className="text-xs text-neutral-900 dark:text-neutral-200 text-center truncate w-full">
                        {file.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}