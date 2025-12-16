"use client";

import { useState } from "react";
import { FileText, CheckCircle2, XCircle } from "lucide-react";

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
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
        Recent Activities
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="py-3 px-4 font-semibold text-sm text-neutral-700 dark:text-neutral-300">Activity</th>
              <th className="py-3 px-4 font-semibold text-sm text-neutral-700 dark:text-neutral-300">File Name</th>
              <th className="py-3 px-4 font-semibold text-sm text-neutral-700 dark:text-neutral-300">Date</th>
              <th className="py-3 px-4 font-semibold text-sm text-neutral-700 dark:text-neutral-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="
                  border-b border-neutral-100 dark:border-neutral-700/50
                  hover:bg-neutral-50 dark:hover:bg-neutral-700/30
                  transition-colors
                "
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.activity}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                    {item.fileName}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.date}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {item.status === "Success" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                      <CheckCircle2 size={14} />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 text-xs font-medium">
                      <XCircle size={14} />
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, mockData.length)} of {mockData.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${currentPage === 1 
                ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed" 
                : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"}
            `}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentPage === page 
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" 
                  : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"}
              `}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${currentPage === totalPages 
                ? "bg-neutral-100 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed" 
                : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"}
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}