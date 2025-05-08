"use client";

import { FileUploader } from "@/components/FileUploader";
import { TextInput } from "@/components/TextInput";
import { EncryptionButton } from "@/components/EncryptionButton";
import { useEncryption } from "@/hooks/useEncryption";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";

export default function Home() {
  const {
    files,
    text,
    password,
    setFiles,
    setText,
    setPassword,
    encryptedResults,
    handleEncrypt,
    handleDecrypt,
  } = useEncryption();

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("File removed!");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center pt-25 pb-5 px-4">
      <div className="max-w-2xl w-full space-y-6">
        <h1
          className="
            crazy-3d-title
            text-center
            font-extrabold
            text-neutral-900
            dark:text-neutral-50
            text-2xl
            md:text-3xl
            tracking-tight
            select-none
          "
        >
          Data Encryption
        </h1>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm shadow-neutral-500 space-y-6">
          <TextInput text={text} setText={setText} />
          <div className="flex items-center space-x-4">
            <FileUploader files={files} setFiles={setFiles} className="
            flex bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 p-4 relative h-full w-fit" />
            <div className="flex-1 space-y-2">
              <div className="flex bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 rounded-r-4xl overflow-hidden p-1 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="p-2 rounded-l-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 outline-none "
                  style={{
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    backgroundColor: 'transparent',
                    WebkitTextFillColor: 'inherit',
                    border: 'inherit',
                    transition: 'background-color 9999s ease-in-out 0s'
                  }}
                />
                <EncryptionButton
                  onEncrypt={handleEncrypt}
                  disabled={!files.length && !text}
                  className="cursor-pointer p-3 absolute right-1 tline-none text-sm rounded-full bg-accent-500 text-white border border-l-0 border-neutral-300 dark:border-neutral-600 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Uploaded Files
              </h2>
              <ul className="space-y-1">
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
              </ul>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}