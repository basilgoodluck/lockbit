import toast from "react-hot-toast";

export interface EncryptionResult {
  name: string;
  encrypted: string;
}

export interface DecryptionResult {
  name: string;
  decrypted: string;
}

export async function encryptData(
  files: File[],
  text: string,
  password: string
): Promise<{
  results: EncryptionResult[];
  iv: string;
  key: string;
} | null> {
  try {
    const formData = new FormData();
    if (text) formData.append("text", text);
    files.forEach((file) => formData.append("files", file));
    formData.append("password", password);

    const response = await fetch("/api/encrypt", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      toast.error(error.error || "Encryption failed");
      return null;
    }

    const data = await response.json();
    toast.success("Data encrypted successfully!");
    return data;
  } catch (error) {
    console.error("Encryption service error:", error);
    toast.error("Encryption failed");
    return null;
  }
}

export async function decryptData(
  encryptedData: string[],
  iv: string,
  key: string
): Promise<DecryptionResult[] | null> {
  try {
    const formData = new FormData();
    encryptedData.forEach((data) => formData.append("encrypted", data));
    formData.append("iv", iv);
    formData.append("key", key);

    const response = await fetch("/api/decrypt", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      toast.error(error.error || "Decryption failed");
      return null;
    }

    const data = await response.json();
    toast.success("Data decrypted successfully!");
    return data.results;
  } catch (error) {
    console.error("Decryption service error:", error);
    toast.error("Decryption failed");
    return null;
  }
}