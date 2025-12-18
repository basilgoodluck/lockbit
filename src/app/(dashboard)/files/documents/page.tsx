"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Download, Eye } from "lucide-react";
import { FilesList } from "@/components/FilesList";

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

  const renderDocumentPreview = (file: StorageFile) => (
    <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
          <Eye size={32} className="text-blue-600 dark:text-blue-400" />
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
        renderPreview={renderDocumentPreview}
      />
      <Toaster position="top-right" />
    </>
  );
}