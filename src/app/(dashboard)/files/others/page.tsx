"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Download, FileQuestion } from "lucide-react";
import { FilesList } from "@/components/FilesList";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

export default function OthersPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockFiles: StorageFile[] = [
        { id: "o1", name: "sales_report.xlsx", size: 24000, uploaded: "2025-05-01", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
        { id: "o2", name: "employee_data.csv", size: 18000, uploaded: "2025-05-03", type: "text/csv" },
        { id: "o3", name: "meeting_notes.txt", size: 2000, uploaded: "2025-05-05", type: "text/plain" },
        { id: "o4", name: "customer_list.csv", size: 30000, uploaded: "2025-05-07", type: "text/csv" },
        { id: "o5", name: "budget_2025.xlsx", size: 22000, uploaded: "2025-05-09", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
        { id: "o6", name: "inventory.csv", size: 15000, uploaded: "2025-05-11", type: "text/csv" },
        { id: "o7", name: "archive.zip", size: 128000, uploaded: "2025-05-13", type: "application/zip" },
        { id: "o8", name: "analytics_data.csv", size: 35000, uploaded: "2025-05-15", type: "text/csv" },
        { id: "o9", name: "backup.sql", size: 45000, uploaded: "2025-05-17", type: "application/sql" },
        { id: "o10", name: "config.json", size: 3000, uploaded: "2025-05-19", type: "application/json" },
      ];
      setFiles(mockFiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("File deleted!");
  };

  const handleDownload = (file: StorageFile) => {
    console.log("Downloading:", file.name);
    toast.success(`Downloading ${file.name}`);
  };

  const renderOtherPreview = (file: StorageFile) => (
    <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
          <FileQuestion size={32} className="text-amber-600 dark:text-amber-400" />
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
        renderPreview={renderOtherPreview}
      />
      <Toaster position="top-right" />
    </>
  );
}