import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { User, Upload, Trash2 } from "lucide-react";
import { SettingsCard } from "./Card";

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
        // Mock API call
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
    // Mock API call
    console.log("Removing photo");
    toast.success("Profile photo removed!");
  };

  return (
    <SettingsCard
      title="Profile Photo"
      description="Upload or remove your profile photo."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
              <User size={24} className="text-neutral-900 dark:text-neutral-300" />
            </div>
          )}
          <div
            {...getRootProps()}
            className={`
              flex-1 p-4 rounded-lg border-2 border-dashed
              ${isDragActive ? "border-accent-500 bg-accent-100" : "border-neutral-300 dark:border-neutral-600"}
              text-neutral-600 dark:text-neutral-300 text-center
              hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors
            `}
          >
            <input {...getInputProps()} />
            <p className="text-sm">
              {isDragActive ? "Drop the image here" : "Drag & drop or click to upload"}
            </p>
          </div>
        </div>
        {photo && (
          <button
            onClick={handleRemovePhoto}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm
              text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500
              transition-colors
            "
          >
            <Trash2 size={16} />
            Remove Photo
          </button>
        )}
      </div>
    </SettingsCard>
  );
}