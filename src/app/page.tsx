"use client";

import { FileUploader } from "@/components/FileUploader";
import { TextInput } from "@/components/TextInput";
import { EncryptionButton } from "@/components/EncryptionButton";
import { useEncryption } from "@/hooks/useEncryption";
import { Toaster } from "react-hot-toast";

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
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            tracking-tight
            select-none
          "
        >
          Data Encryption
        </h1>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg shadow-neutral-500 space-y-6">
          <FileUploader files={files} setFiles={setFiles} />
          <TextInput text={text} setText={setText} />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Encryption Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div className="flex space-x-4">
            <EncryptionButton
              onEncrypt={handleEncrypt}
              disabled={!files.length && !text}
              label="Encrypt"
            />
            <EncryptionButton
              onEncrypt={handleDecrypt}
              disabled={!encryptedResults.length}
              label="Decrypt"
            />
          </div>
          {encryptedResults.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Encrypted Files
              </h2>
              <ul className="space-y-1">
                {encryptedResults.map((result, index) => (
                  <li
                    key={index}
                    className="text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    {result.name}
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