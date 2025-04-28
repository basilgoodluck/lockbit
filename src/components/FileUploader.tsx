import { ChangeEvent, useRef } from "react";
import toast from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";

interface FileUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export function FileUploader({ files, setFiles }: FileUploaderProps) {
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

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("File removed!");
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm md:text-2xl font-medium text-neutral-700 dark:text-neutral-300">
        Upload your File(s)
      </label>

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
        className="
          cursor-pointer 
          px-6 py-2 
          rounded-md 
          font-semibold 
          text-sm 
          text-primary-700 
          bg-primary-50 
          hover:bg-primary-100 
          dark:bg-neutral-700 
          dark:text-neutral-200 
          dark:hover:bg-neutral-600 
          transition-colors duration-200
          select-none
        "
      >
        Select Files
      </button>

      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          <div className=" grid grid-cols-2 gap-2 ">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-700 p-2 rounded-md"
            >
              <span className="text-sm text-neutral-900 dark:text-neutral-200">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-accent-500 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-600 cursor-pointer"
              >
                <FaTimesCircle />
              </button>
            </li>
          ))}

          </div>
        </ul>
      )}
    </div>
  );
}
