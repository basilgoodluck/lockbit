"use client";

import { Folder, Video, Image, FileText, FileAudio } from "lucide-react";
import { JSX } from "react";

type FolderBoxProps = {
  label: string;
  resourceCount: number;
  resourceType: string;
};

const iconMap: Record<string, JSX.Element> = {
  image: <Image size={56} className="text-neutral-50" />,
  document: <FileText size={56} className="text-neutral-50" />,
  audio: <FileAudio size={56} className="text-neutral-50" />,
  video: <Video size={56} className="text-neutral-50" />,
};

export function FolderBox({ label, resourceCount, resourceType }: FolderBoxProps) {
  const icon = iconMap[resourceType] || <Folder size={56} className="text-neutral-50" />;

  return (
    <div
      className="
        p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        transition-colors cursor-pointer
      "
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-amber-200">
            {label}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {resourceCount}
          </p>
        </div>
      </div>
    </div>
  );
}