import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const text = formData.get("text") as string | null;
    const files = formData.getAll("files") as File[];
    const password = formData.get("password") as string;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required to lock files" },
        { status: 400 }
      );
    }

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new TextEncoder().encode("encryption-salt"),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));

    let results: { name: string; encrypted: string }[] = [];
    if (text) {
      const encodedText = new TextEncoder().encode(text);
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedText
      );
      results.push({
        name: "text",
        encrypted: Buffer.from(encrypted).toString("base64"),
      });
    }

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        buffer
      );
      results.push({
        name: file.name,
        encrypted: Buffer.from(encrypted).toString("base64"),
      });
    }

    return NextResponse.json({
      results,
      iv: Buffer.from(iv).toString("base64"),
      key: Buffer.from(await crypto.subtle.exportKey("raw", key)).toString("base64"),
    });
  } catch (error) {
    console.error("Encryption error:", error);
    return NextResponse.json(
      { error: "Encryption failed" },
      { status: 500 }
    );
  }
}