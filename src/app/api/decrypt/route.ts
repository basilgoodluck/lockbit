import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const encryptedData = formData.getAll("encrypted") as string[];
    const iv = formData.get("iv") as string;
    const keyBase64 = formData.get("key") as string;

    if (!encryptedData.length || !iv || !keyBase64) {
      return NextResponse.json(
        { error: "Missing encrypted data, IV, or key" },
        { status: 400 }
      );
    }

    const keyBuffer = Buffer.from(keyBase64, "base64");
    const ivBuffer = Buffer.from(iv, "base64");
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );

    const results: { name: string; decrypted: string }[] = [];
    for (const [index, data] of encryptedData.entries()) {
      const encryptedBuffer = Buffer.from(data, "base64");
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: ivBuffer },
        key,
        encryptedBuffer
      );
      const decryptedText = new TextDecoder().decode(decrypted);
      results.push({
        name: `data-${index + 1}`,
        decrypted: decryptedText,
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Decryption error:", error);
    return NextResponse.json(
      { error: "Decryption failed" },
      { status: 500 }
    );
  }
}