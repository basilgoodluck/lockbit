import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { User, Trash2, Upload } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function ProfilePhotoSettings() {
  const [photo, setPhoto] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(file);
        setPhoto(url);
        console.log("Uploading photo:", file);
        toast.success("Profile photo uploaded!");
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid image (JPG/PNG, max 5MB).");
    },
  });

  const handleRemovePhoto = () => {
    setPhoto(null);
    console.log("Removing photo");
    toast.success("Profile photo removed!");
  };

  return (
    <SettingsCard
      title="Profile Photo"
      description="Upload or remove your profile photo"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                <User size={32} className="text-neutral-400" />
              </div>
            )}
          </div>
          
          <div
            {...getRootProps()}
            className={`flex-1 p-4 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
              isDragActive
                ? "border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                : "border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <Upload size={20} className="mx-auto mb-2 text-neutral-400" />
              <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">
                {isDragActive ? "Drop here" : "Upload photo"}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>
        
        {photo && (
          <button
            onClick={handleRemovePhoto}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
          >
            <Trash2 size={16} />
            Remove Photo
          </button>
        )}
      </div>
    </SettingsCard>
  );
}