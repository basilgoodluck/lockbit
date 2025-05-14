"use client";

import { useState, useEffect } from "react";
import { FilePreview } from "@/components/FilePreview";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { Image, Download } from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

export default function ImagesPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockFiles: StorageFile[] = [
        { id: "i1", name: "photo.jpg", size: 12000, uploaded: "2025-05-01", type: "image/jpeg" },
        { id: "i2", name: "artwork.png", size: 8000, uploaded: "2025-05-02", type: "image/png" },
        { id: "i3", name: "screenshot.jpeg", size: 15000, uploaded: "2025-05-04", type: "image/jpeg" },
        { id: "i4", name: "logo.gif", size: 5000, uploaded: "2025-05-06", type: "image/gif" },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("Image deleted!");
  };

  const handleDownload = (file: StorageFile) => {
    console.log("Downloading:", file.name);
    toast.success(`Downloading ${file.name}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6 flex items-center gap-2">
          <Image className="w-6 h-6" />
          Images
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                borderRadius={8}
                baseColor="dark:!bg-neutral-700 "
                highlightColor="dark:!bg-neutral-600"
                className="dark:!bg-neutral-700 "
                enableAnimation
              />
            ))}
          </div>
        ) : files.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-400 text-center py-12">
            No images found in your storage.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative group bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
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
                <div className="w-full">
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