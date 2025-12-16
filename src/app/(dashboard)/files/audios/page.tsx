"use client";

import { useState, useEffect } from "react";
import { FilePreview } from "@/components/FilePreview";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Download, Music, Play } from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

export default function AudiosPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockFiles: StorageFile[] = [
        { id: "a1", name: "song.mp3", size: 8000, uploaded: "2025-05-01", type: "audio/mpeg" },
        { id: "a2", name: "podcast.wav", size: 25000, uploaded: "2025-05-02", type: "audio/wav" },
        { id: "a3", name: "lecture.m4a", size: 12000, uploaded: "2025-05-04", type: "audio/mp4" },
        { id: "a4", name: "soundtrack.mp3", size: 10000, uploaded: "2025-05-06", type: "audio/mpeg" },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("Audio deleted!");
  };

  const handleDownload = (file: StorageFile) => {
    console.log("Downloading:", file.name);
    toast.success(`Downloading ${file.name}`);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Music size={24} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            Audios
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {files.length} {files.length === 1 ? 'audio' : 'audios'} in your library
          </p>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Music size={32} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">
            No audios found
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-1">
            Upload your first audio to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
            >
              <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                    <Play size={32} className="text-emerald-600 dark:text-emerald-400" />
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
              <div className="p-4">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate mb-2">
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{(file.size / 1000).toFixed(2)} KB</span>
                  <span>{file.uploaded}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}