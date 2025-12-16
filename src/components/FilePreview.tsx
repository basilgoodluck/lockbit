'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import mammoth from "mammoth";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Only Viewer, dynamic import, SSR disabled
const PDFViewer = dynamic(
  () => import("@react-pdf-viewer/core").then(mod => mod.Viewer),
  { ssr: false }
);

type FilePreviewProps = {
  file: File;
};

export function FilePreview({ file }: FilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [docxHtml, setDocxHtml] = useState<string | null>(null);

  useEffect(() => {
    if (
      file.type.startsWith("image/") ||
      file.type.startsWith("video/") ||
      file.type.startsWith("audio/") ||
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (file.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setTextContent(text.slice(0, 200) + (text.length > 200 ? "..." : ""));
      };
      reader.readAsText(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDocxHtml(result.value);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  const renderPreview = () => {
    if (file.type.startsWith("image/") && previewUrl) {
      return (
        <img
          src={previewUrl}
          alt={file.name}
          className="mt-2 max-h-32 w-full object-contain rounded-md"
        />
      );
    } else if (file.type.startsWith("video/") && previewUrl) {
      return (
        <video
          src={previewUrl}
          controls
          className="mt-2 max-h-84 w-full rounded-md"
        />
      );
    } else if (file.type.startsWith("audio/") && previewUrl) {
      return (
        <div className="mt-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
          <audio controls className="w-full">
            <source src={previewUrl} type={file.type} />
            Your browser does not support the audio tag.
          </audio>
        </div>
      );
    } else if (file.type.startsWith("text/") && textContent) {
      return (
        <pre className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md whitespace-pre-wrap">
          {textContent}
        </pre>
      );
    } else if (file.type === "application/pdf" && previewUrl) {
      return (
        <div className="mt-2 max-h-32 overflow-hidden border border-neutral-300 dark:border-neutral-600 rounded-md">
          <PDFViewer
            fileUrl={previewUrl}
            initialPage={0}
            defaultScale={0.75}
          />
        </div>
      );
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      docxHtml
    ) {
      return (
        <div
          className="mt-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md prose text-neutral-600 dark:text-neutral-300 max-h-32 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: docxHtml }}
        />
      );
    } else {
      return (
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Preview not available for this file type.
        </p>
      );
    }
  };

  return <div>{renderPreview()}</div>;
}
