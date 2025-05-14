"use client";

import { useState, useEffect } from "react";
import { FilePreview } from "@/components/FilePreview";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { Video, Download } from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

export default function VideosPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockFiles: StorageFile[] = [
        { id: "v1", name: "vacation.mp4", size: 150000, uploaded: "2025-05-01", type: "video/mp4" },
        { id: "v2", name: "tutorial.mov", size: 200000, uploaded: "2025-05-03", type: "video/quicktime" },
        { id: "v3", name: "demo.mp4", size: 80000, uploaded: "2025-05-05", type: "video/mp4" },
        { id: "v4", name: "presentation.mp4", size: 120000, uploaded: "2025-05-07", type: "video/mp4" },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("Video deleted!");
  };

  const handleDownload = (file: StorageFile) => {
    console.log("Downloading:", file.name);
    toast.success(`Downloading ${file.name}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6 flex items-center gap-2">
          <Video className="w-6 h-6" />
          Videos
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                borderRadius={8}
                baseColor="#e5e7eb"
                highlightColor="#d1d5db"
                className="dark:!bg-neutral-700 dark:!bg-opacity-100"
                enableAnimation
              />
            ))}
          </div>
        ) : files.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-400 text-center py-12">
            No videos found in your storage.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative group overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <button
                  onClick={() => handleDelete(file.id)}
                  className="absolute top-2 right-2 text-accent-500 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <FaTimesCircle size={18} />
                </button>
                <button
                  onClick={() => handleDownload(file)}
                  className="absolute top-10 right-2 text-accent-500 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Download size={18} />
                </button>
                <div className=" w-full">
                  <FilePreview file={new File([file.name], file.name, { type: file.type })} />
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-200 truncate">
                    {file.name}
                  </p>
                  {/* <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {(file.size / 1000).toFixed(2)} KB
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {file.uploaded}
                  </p> */}
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