"use client";

import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { TextInput } from "@/components/TextInput";
import { EncryptionButton } from "@/components/EncryptionButton";
import { FilePreview } from "@/components/FilePreview";
import { useEncryption } from "@/hooks/useEncryption";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { Lock, HardDrive } from "lucide-react";

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
  const [source, setSource] = useState<"computer" | "storage">("computer");
  const [selectedStorageFiles, setSelectedStorageFiles] = useState<string[]>([]);

  // Mock storage files (replace with real API call)
  const storageFiles = [
    { id: "1", name: "report.pdf", size: 24000, lastModified: 1625097600000 },
    { id: "2", name: "photo.jpg", size: 12000, lastModified: 1625184000000 },
    { id: "3", name: "video.mp4", size: 150000, lastModified: 1625270400000 },
  ];

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
    if (uniqueFiles.length > 0) {
      toast.success(`${uniqueFiles.length} file(s) added!`);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("File removed!");
  };

  const toggleStorageFile = (fileId: string) => {
    setSelectedStorageFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleEncryptClick = () => {
    if (source === "computer" && files.length === 0) {
      toast.error("Please upload at least one file!");
      return;
    }
    if (source === "storage" && selectedStorageFiles.length === 0) {
      toast.error("Please select at least one file from storage!");
      return;
    }
    if (!password) {
      toast.error("Please enter a password!");
      return;
    }
    handleEncrypt();
    toast.success("Encryption started!");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6">
          Encrypt Files
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Input Section */}
          <div className="w-full md:w-1/2 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-6">
            {/* Source Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setSource("computer")}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-semibold
                  ${
                    source === "computer"
                      ? "bg-accent-500 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200"
                  }
                  hover:bg-accent-600 hover:text-white transition-colors
                `}
              >
                From Computer
              </button>
              <button
                onClick={() => setSource("storage")}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-semibold
                  ${
                    source === "storage"
                      ? "bg-accent-500 text-white"
                      : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200"
                  }
                  hover:bg-accent-600 hover:text-white transition-colors
                `}
              >
                From Storage
              </button>
            </div>
            {/* Source-Specific Input */}
            {source === "computer" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    Upload Files
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
                    Message (Optional)
                  </label>
                  <TextInput text={text} setText={setText} />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Select Files from Storage
                </label>
                <div className="max-h-48 overflow-y-auto bg-neutral-200 dark:bg-neutral-700 rounded-lg p-2">
                  {storageFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-2 p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStorageFiles.includes(file.id)}
                        onChange={() => toggleStorageFile(file.id)}
                        className="h-4 w-4 text-accent-500"
                      />
                      <span className="text-sm text-neutral-900 dark:text-neutral-200 truncate">
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <Lock className="w-5 h-5" />
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
                  onEncrypt={handleEncryptClick}
                  disabled={
                    source === "computer"
                      ? !files.length
                      : !selectedStorageFiles.length
                  }
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
          {/* Right: File Previews or Results */}
          <div className="w-full md:w-1/2 bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {source === "computer" ? "Uploaded Files" : "Selected Files"}
            </h2>
            {source === "computer" && files.length > 0 && (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto"
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
            )}
            {source === "storage" && selectedStorageFiles.length > 0 && (
              <div className="space-y-2">
                {storageFiles
                  .filter((file) => selectedStorageFiles.includes(file.id))
                  .map((file) => (
                    <div
                      key={file.id}
                      className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-between"
                    >
                      <span className="text-sm text-neutral-900 dark:text-neutral-200 truncate">
                        {file.name}
                      </span>
                      <button
                        onClick={() => toggleStorageFile(file.id)}
                        className="text-accent-500 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-600"
                      >
                        <FaTimesCircle size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            )}
            {encryptedResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-50">
                  Encrypted Results
                </h3>
                {encryptedResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 bg-neutral-200 dark:bg-neutral-700 rounded"
                  >
                    <p className="text-sm text-neutral-900 dark:text-neutral-200">
                      {result.name}: {result.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}