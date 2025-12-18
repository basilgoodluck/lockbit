"use client";

import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Upload, File } from "lucide-react";

interface FileUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
  className: string;
}

export function FileUploader({ files, setFiles, className }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles = Array.from(selectedFiles);
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

    if (uniqueFiles.length > 0) {
      setFiles([...files, ...uniqueFiles]);
      toast.success(`${uniqueFiles.length} file(s) added!`);
    }

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    const newFiles = Array.from(droppedFiles);
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

    if (uniqueFiles.length > 0) {
      setFiles([...files, ...uniqueFiles]);
      toast.success(`${uniqueFiles.length} file(s) added!`);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`
        ${className}
        bg-white dark:bg-neutral-900/50
        border-2 border-dashed rounded-lg p-8
        transition-all duration-200 cursor-pointer
        ${isDragging 
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.01]" 
          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
        }
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center transition-all
          ${isDragging 
            ? "bg-blue-100 dark:bg-blue-900/30 scale-110" 
            : "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          }
        `}>
          {isDragging ? (
            <File size={28} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <Upload size={28} className="text-neutral-600 dark:text-neutral-400" />
          )}
        </div>
        <div className="text-center">
          <p className={`text-sm font-semibold mb-1 transition-colors ${
            isDragging 
              ? "text-blue-600 dark:text-blue-400" 
              : "text-neutral-900 dark:text-white"
          }`}>
            {isDragging ? "Drop your files here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Support for multiple files
          </p>
        </div>
      </div>
    </div>
  );
}