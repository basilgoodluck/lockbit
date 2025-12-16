"use client";

import { useState, useEffect } from "react";
import { FilePreview } from "@/components/FilePreview";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { FileText, Download } from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

export default function DocumentsPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockFiles: StorageFile[] = [
        { id: "d1", name: "report.pdf", size: 24000, uploaded: "2025-05-01", type: "application/pdf" },
        { id: "d2", name: "contract.docx", size: 18000, uploaded: "2025-05-03", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
        { id: "d3", name: "notes.txt", size: 2000, uploaded: "2025-05-05", type: "text/plain" },
        { id: "d4", name: "proposal.pdf", size: 30000, uploaded: "2025-05-07", type: "application/pdf" },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("Document deleted!");
  };

  const handleDownload = (file: StorageFile) => {
    console.log("Downloading:", file.name);
    toast.success(`Downloading ${file.name}`);
  };

  const DocumentSkeleton = () => (
    <div className="flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-neutral-200 dark:bg-neutral-700 h-40 w-full animate-pulse"></div>
      <div className="p-3 space-y-2 bg-neutral-200 dark:bg-neutral-700">
        <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-medium text-neutral-900 dark:text-amber-200 mb-6 flex items-center gap-2">
          <FileText size={20} className="text-amber-500" />
          Documents
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <DocumentSkeleton key={i} />
            ))}
          </div>
        ) : files.length === 0 ? (
          <p className="text-neutral-600 dark:text-amber-300 text-center py-12 text-sm">
            No documents found in your storage.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative group bg-neutral-200 dark:bg-neutral-700 rounded-2xl shadow-sm overflow-hidden hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:scale-105 transition-all duration-200"
              >
                <button
                  onClick={() => handleDelete(file.id)}
                  className="absolute top-2 right-2 text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <FaTimesCircle size={16} />
                </button>
                <button
                  onClick={() => handleDownload(file)}
                  className="absolute top-10 right-2 text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Download size={16} />
                </button>
                <div className="w-full">
                  <FilePreview file={new File([file.name], file.name, { type: file.type })} />
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm text-neutral-700 dark:text-amber-200 truncate font-mono">
                    {file.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-amber-300">
                    {(file.size / 1000).toFixed(2)} KB
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-amber-300">
                    {file.uploaded}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}