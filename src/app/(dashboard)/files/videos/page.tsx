"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Download, Play } from "lucide-react";
import { FilesList } from "@/components/FilesList";

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
        { id: "v5", name: "webinar.mp4", size: 95000, uploaded: "2025-05-09", type: "video/mp4" },
        { id: "v6", name: "interview.mov", size: 180000, uploaded: "2025-05-11", type: "video/quicktime" },
        { id: "v7", name: "conference.mp4", size: 210000, uploaded: "2025-05-13", type: "video/mp4" },
        { id: "v8", name: "training.mp4", size: 165000, uploaded: "2025-05-15", type: "video/mp4" },
        { id: "v9", name: "workshop.mp4", size: 140000, uploaded: "2025-05-17", type: "video/mp4" },
        { id: "v10", name: "lecture.mov", size: 190000, uploaded: "2025-05-19", type: "video/quicktime" },
        { id: "v11", name: "meeting.mp4", size: 110000, uploaded: "2025-05-21", type: "video/mp4" },
        { id: "v12", name: "seminar.mp4", size: 175000, uploaded: "2025-05-23", type: "video/mp4" },
        { id: "v13", name: "review.mp4", size: 85000, uploaded: "2025-05-25", type: "video/mp4" },
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

  const renderVideoPreview = (file: StorageFile) => (
    <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
          <Play size={32} className="text-rose-600 dark:text-rose-400" />
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
        renderPreview={renderVideoPreview}
      />
      <Toaster position="top-right" />
    </>
  );
}