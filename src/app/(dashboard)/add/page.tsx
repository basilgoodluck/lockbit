"use client";

import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { FilePreview } from "@/components/FilePreview";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { UploadCloud } from "lucide-react";

export default function AddFilePage() {
  const [files, setFiles] = useState<File[]>([]);

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

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("No files to upload!");
      return;
    }
    // Mock API call to save files to storage
    console.log("Uploading files to storage:", files);
    toast.success(`${files.length} file(s) uploaded to storage!`);
    setFiles([]); // Clear files after upload
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6">
          Add Files to Storage
        </h1>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md space-y-6">
          {/* File Uploader */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <UploadCloud className="w-5 h-5" />
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
          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="
              w-full sm:w-auto px-6 py-2 rounded-lg text-sm font-semibold
              bg-accent-500 text-white hover:bg-accent-600
              disabled:bg-neutral-300 disabled:text-neutral-500
              dark:disabled:bg-neutral-700 dark:disabled:text-neutral-400
              transition-colors
            "
          >
            Upload to Storage
          </button>
          {/* File Previews */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Selected Files ({files.length})
              </h2>
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
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}