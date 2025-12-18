"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Download, Search, ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  uploaded: string;
  type: string;
}

interface FilesListProps {
  files: StorageFile[];
  onDelete: (id: string) => void;
  onDownload: (file: StorageFile) => void;
  renderPreview: (file: StorageFile) => React.ReactNode;
  itemsPerPage?: number;
}

export function FilesList({ files, onDelete, onDownload, renderPreview, itemsPerPage = 12 }: FilesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime();
    if (sortBy === "size") return b.size - a.size;
    return 0;
  });

  const totalPages = Math.ceil(sortedFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = sortedFiles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search files..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "date" | "size")}
            className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
          </select>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-all ${viewMode === "grid" ? "bg-white dark:bg-neutral-700 shadow-sm" : "hover:bg-neutral-200 dark:hover:bg-neutral-700"}`}
            >
              <Grid3x3 size={16} className="text-neutral-600 dark:text-neutral-400" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-all ${viewMode === "list" ? "bg-white dark:bg-neutral-700 shadow-sm" : "hover:bg-neutral-200 dark:hover:bg-neutral-700"}`}
            >
              <List size={16} className="text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedFiles.length)} of {sortedFiles.length} files
        </p>
      </div>

      {paginatedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">
            No files found
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-1">
            {searchQuery ? "Try a different search term" : "Upload your first file to get started"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedFiles.map((file) => (
            <div
              key={file.id}
              className="group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
            >
              {renderPreview(file)}
              <div className="p-4">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate mb-2">
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>{(file.size / 1000).toFixed(2)} KB</span>
                  <span>{file.uploaded}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {paginatedFiles.map((file) => (
            <div
              key={file.id}
              className="group flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-600 transition-all"
            >
              <div className="w-16 h-16 flex-shrink-0">
                {renderPreview(file)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {file.name}
                </p>
                <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  <span>{(file.size / 1000).toFixed(2)} KB</span>
                  <span>{file.uploaded}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDownload(file)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  <Download size={16} className="text-neutral-700 dark:text-neutral-300" />
                </button>
                <button
                  onClick={() => onDelete(file.id)}
                  className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
                >
                  <Trash2 size={16} className="text-rose-600 dark:text-rose-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} className="text-neutral-700 dark:text-neutral-300" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} className="text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      )}
    </div>
  );
}