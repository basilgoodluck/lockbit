"use client";
import { Folder, Video, Image, FileText, FileAudio } from "lucide-react";
import { JSX } from "react";

type FolderBoxProps = {
  label: string;
  resourceCount: number;
  resourceType: string;
};

const iconMap: Record<string, { icon: JSX.Element; color: string; bgColor: string }> = {
  image: { 
    icon: <Image size={24} />, 
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30"
  },
  document: { 
    icon: <FileText size={24} />, 
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  audio: { 
    icon: <FileAudio size={24} />, 
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  video: { 
    icon: <Video size={24} />, 
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30"
  },
};

export function FolderBox({ label, resourceCount, resourceType }: FolderBoxProps) {
  const iconData = iconMap[resourceType] || { 
    icon: <Folder size={24} />, 
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800"
  };
  
  return (
    <div
      className="
        relative p-4 bg-white dark:bg-neutral-800
        rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700
        hover:shadow-md hover:scale-105 transform transition-all duration-200
        cursor-pointer group
      "
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 ${iconData.bgColor} rounded-lg transition-colors`}>
          <div className={iconData.color}>
            {iconData.icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-neutral-900 dark:text-white">
            {label}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {resourceCount} {resourceType}
          </p>
        </div>
      </div>
    </div>
  );
}