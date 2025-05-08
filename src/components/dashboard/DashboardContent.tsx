import { RecentActivities } from "./RecentActivities";
import { FolderBox } from "./FolderBox";

export function DashboardContent() {
  const folders = [
    { label: "Videos", resourceCount: 12, resourceType: "Video" },
    { label: "Audio", resourceCount: 25, resourceType: "Audio" },
    { label: "Images", resourceCount: 25, resourceType: "Image" },
    { label: "Documents", resourceCount: 8, resourceType: "Document" },
    { label: "Others", resourceCount: 25, resourceType: "Others" },
  ];

  return (
    <main className="p-6 min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder, index) => (
          <FolderBox
            key={index}
            label={folder.label}
            resourceCount={folder.resourceCount}
            resourceType={folder.resourceType.toLowerCase()}
          />
        ))}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <RecentActivities />
        </div>
      </div>
    </main>
  );
}