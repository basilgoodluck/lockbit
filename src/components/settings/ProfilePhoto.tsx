import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { User, Trash2, Upload } from "lucide-react";
import { SettingsCard } from "./SettingsCard";

export function ProfilePhotoSettings() {
  const [photo, setPhoto] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxSize: 5 * 1024 * 1024, // 5MB
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
        {/* Photo Preview & Upload Area */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                <User size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
            )}
          </div>

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`flex-1 w-full p-6 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-50 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
                <Upload size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                {isDragActive ? "Drop the image here" : "Upload profile photo"}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        {photo && (
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <button
              onClick={handleRemovePhoto}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
            >
              <Trash2 size={16} />
              Remove Photo
            </button>
          </div>
        )}
      </div>
    </SettingsCard>
  );
}
