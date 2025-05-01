import { ChangeEvent, useRef } from "react";
import toast from "react-hot-toast";

interface FileUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
  className: string
}

export function FileUploader({ files, setFiles, className }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles([...files, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added!`);
      e.target.value = "";
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="">
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={openFileDialog}
        className={`
          ${className}
          cursor-pointer 
          text-sm
          text-primary-700 
          bg-primary-50 
          hover:bg-primary-100 
          dark:bg-neutral-700 
          dark:text-neutral-200 
          dark:hover:bg-neutral-600 
          transition-colors duration-200
          select-none`}
      >
        Click to upload files
      </button>
    </div>
  );
}