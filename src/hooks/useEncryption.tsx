"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { encryptData, EncryptionResult, DecryptionResult, decryptData } from "@/lib/services/encryption";

export function useEncryption() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [encryptedResults, setEncryptedResults] = useState<EncryptionResult[]>([]);
  const [iv, setIv] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const handleEncrypt = async () => {
    if (!files.length && !text) {
      toast.error("Please upload a file or enter text to encrypt.");
      return;
    }
    if (!password) {
      toast.error("Please enter a password for encryption.");
      return;
    }

    const result = await encryptData(files, text, password);
    if (result) {
      setEncryptedResults(result.results);
      setIv(result.iv);
      setKey(result.key);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedResults.length) {
      toast.error("No encrypted data to decrypt.");
      return;
    }

    const encryptedData = encryptedResults.map((result) => result.encrypted);
    const decrypted = await decryptData(encryptedData, iv, key);
    if (decrypted) {
      console.log("Decrypted results:", decrypted);
      toast.success("Decryption complete! Check console for results.");
    }
  };

  return {
    files,
    text,
    password,
    setFiles,
    setText,
    setPassword,
    encryptedResults,
    handleEncrypt,
    handleDecrypt,
  };
}