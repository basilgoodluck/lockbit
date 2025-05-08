"use client";

import { useState } from "react";
import { FileText, CheckCircle, XCircle } from "lucide-react";

type Activity = {
  id: number;
  activity: string;
  fileName: string;
  date: string;
  status: "Success" | "Failed";
};

const mockData: Activity[] = [
  { id: 1, activity: "File Encrypted", fileName: "document.pdf", date: "2025-05-08 14:30", status: "Success" },
  { id: 2, activity: "File Encrypted", fileName: "image.jpg", date: "2025-05-08 12:15", status: "Success" },
  { id: 3, activity: "File Encrypted", fileName: "data.xlsx", date: "2025-05-07 09:45", status: "Failed" },
  { id: 4, activity: "File Encrypted", fileName: "report.doc", date: "2025-05-07 08:20", status: "Success" },
  { id: 5, activity: "File Encrypted", fileName: "backup.zip", date: "2025-05-06 16:50", status: "Success" },
  { id: 6, activity: "File Encrypted", fileName: "notes.txt", date: "2025-05-06 14:10", status: "Success" },
  { id: 7, activity: "File Encrypted", fileName: "project.pptx", date: "2025-05-05 11:25", status: "Failed" },
  { id: 8, activity: "File Encrypted", fileName: "video.mp4", date: "2025-05-05 10:00", status: "Success" },
];

export function RecentActivities() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
        Recent Activities
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-neutral-600 dark:text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="py-3 px-4 font-medium">Activity</th>
              <th className="py-3 px-4 font-medium">File Name</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="
                  border-b border-neutral-200 dark:border-neutral-700
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  transition-colors
                "
              >
                <td className="py-3 px-4 flex items-center gap-2">
                  <FileText size={16} />
                  {item.activity}
                </td>
                <td className="py-3 px-4">{item.fileName}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  {item.status === "Success" ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, mockData.length)} of {mockData.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              px-3 py-1 rounded-full text-sm
              ${currentPage === 1 ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-400" : "bg-accent-500 text-white hover:bg-accent-600"}
              transition-colors
            `}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                px-3 py-1 rounded-full text-sm
                ${currentPage === page ? "bg-accent-500 text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-accent-500 hover:text-white"}
                transition-colors
              `}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-1 rounded-full text-sm
              ${currentPage === totalPages ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-400" : "bg-accent-500 text-white hover:bg-accent-600"}
              transition-colors
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}