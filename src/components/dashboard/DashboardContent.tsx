import { RecentActivities } from "./RecentActivities";
import { FolderBox } from "./FolderBox";


export function DashboardContent() {
  const folders = [
    { label: "Videos", resourceCount: 12, resourceType: "video" },
    { label: "Audio", resourceCount: 25, resourceType: "audio" },
    { label: "Images", resourceCount: 25, resourceType: "image" },
    { label: "Documents", resourceCount: 8, resourceType: "document" },
    { label: "Others", resourceCount: 25, resourceType: "others" },
  ];

  return (
    <main className="p-6 min-h-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <FolderBox
            key={index}
            label={folder.label}
            resourceCount={folder.resourceCount}
            resourceType={folder.resourceType.toLowerCase()}
          />
        ))}
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-6">
          <RecentActivities />
        </div>
      </div>
    </main>
  );
}