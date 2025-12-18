"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Download, Image as ImageIcon } from "lucide-react";
import { FilesList } from "@/components/FilesList";

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

  const renderImagePreview = (file: StorageFile) => (
    <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 bg-violet-100 dark:bg-violet-900/30 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
          <ImageIcon size={32} className="text-violet-600 dark:text-violet-400" />
        </div>
      </div>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleDownload(file)}
          className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <Download size={16} className="text-neutral-700 dark:text-neutral-300" />
        </button>
        <button
          onClick={() => handleDelete(file.id)}
          className="p-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
        >
          <Trash2 size={16} className="text-rose-600 dark:text-rose-400" />
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      <FilesList
        files={files}
        onDelete={handleDelete}
        onDownload={handleDownload}
        renderPreview={renderImagePreview}
      />
      <Toaster position="top-right" />
    </>
  );
}