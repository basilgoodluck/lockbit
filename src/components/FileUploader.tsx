"use client";

import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

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
        bg-primary-50 dark:bg-neutral-700
        border-2 border-dashed border-neutral-300 dark:border-neutral-600
        rounded-lg p-4
        transition-colors duration-200
        ${isDragging ? "border-accent-500 bg-primary-100 dark:bg-neutral-600" : ""}
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={openFileDialog}
          className="
            cursor-pointer text-sm
            text-primary-700 bg-primary-50 hover:bg-primary-100
            dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600
            px-4 py-2 rounded-md
            transition-colors duration-200
            select-none
          "
        >
          <Plus size={24} />
        </button>
        <p
          className={`
            text-xs text-neutral-600 dark:text-neutral-300
            ${isDragging ? "text-accent-500 dark:text-accent-400" : ""}
          `}
        >
          {isDragging ? "Drop files here" : "or drag and drop files"}
        </p>
      </div>
    </div>
  );
}