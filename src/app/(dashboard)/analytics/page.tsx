"use client";

import { useState } from "react";
import { HardDrive, TrendingUp, FileText, Image, Video, Music, FileArchive, Calendar } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const storageUsage = {
  used: 3.5,
  total: 10,
};

const creditsUsage = {
  used: 295,
  total: 500,
};

const fileTypes = [
  { type: "Videos", value: 1200, count: 45, color: "#ef4444" }, 
  { type: "Audio", value: 2500, count: 87, color: "#8b5cf6" },
  { type: "Images", value: 2500, count: 156, color: "#10b981" }, 
  { type: "Documents", value: 800, count: 92, color: "#3b82f6" },
  { type: "Others", value: 500, count: 34, color: "#f59e0b" }, 
];

const uploadActivity = [
  { date: "7 May", files: 3, size: 120 },
  { date: "8 May", files: 5, size: 300 },
  { date: "9 May", files: 2, size: 80 },
  { date: "10 May", files: 4, size: 200 },
  { date: "11 May", files: 1, size: 50 },
  { date: "12 May", files: 6, size: 350 },
  { date: "13 May", files: 3, size: 150 },
];

const topFiles = [
  { name: "presentation.pptx", type: "Document", size: 24, uploaded: "1 May", icon: FileText, color: "text-blue-600 dark:text-blue-400" },
  { name: "tutorial_video.mp4", type: "Video", size: 150, uploaded: "3 May", icon: Video, color: "text-rose-600 dark:text-rose-400" },
  { name: "cover_photo.jpg", type: "Image", size: 12, uploaded: "5 May", icon: Image, color: "text-emerald-600 dark:text-emerald-400" },
  { name: "podcast_ep12.mp3", type: "Audio", size: 8, uploaded: "2 May", icon: Music, color: "text-purple-600 dark:text-purple-400" },
  { name: "project_backup.zip", type: "Others", size: 100, uploaded: "4 May", icon: FileArchive, color: "text-amber-600 dark:text-amber-400" },
];

const CHART_COLORS = ["#ef4444", "#8b5cf6", "#10b981", "#3b82f6", "#f59e0b"];

export default function AnalyticsPage() {
  const [chartType, setChartType] = useState<"files" | "size">("files");
  const [selectedYear, setSelectedYear] = useState("2025");

  const storagePercentage = (storageUsage.used / storageUsage.total) * 100;
  const totalFiles = fileTypes.reduce((acc, curr) => acc + curr.count, 0);
  const totalSize = fileTypes.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Storage Analytics
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your storage usage and file activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Storage Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center">
              <HardDrive size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Storage Used</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {storageUsage.used} GB
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                {storagePercentage.toFixed(1)}% used
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                {storageUsage.total} GB total
              </span>
            </div>
          </div>
        </div>

        {/* Total Files Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Files</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {totalFiles}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+12% from last month</span>
          </div>
        </div>

        {/* Total Size Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/30 rounded-xl flex items-center justify-center">
              <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">This Month</p>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {(totalSize / 1000).toFixed(1)} GB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">+8% from last month</span>
          </div>
        </div>
      </div>

      {/* File Type Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {fileTypes.map((item) => (
          <div
            key={item.type}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                {item.type === "Videos" && <Video size={20} style={{ color: item.color }} />}
                {item.type === "Audio" && <Music size={20} style={{ color: item.color }} />}
                {item.type === "Images" && <Image size={20} style={{ color: item.color }} />}
                {item.type === "Documents" && <FileText size={20} style={{ color: item.color }} />}
                {item.type === "Others" && <FileArchive size={20} style={{ color: item.color }} />}
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              {item.type}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-neutral-900 dark:text-white">
                {item.count}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                files
              </p>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {(item.value / 1000).toFixed(1)} GB
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
            Storage Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fileTypes}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {fileTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(38, 38, 38)",
                  color: "rgb(212, 212, 212)",
                  borderRadius: "8px",
                  border: "none",
                }}
                formatter={(value: number) => `${(value / 1000).toFixed(2)} GB`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Upload Activity Line Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Upload Activity
            </h2>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartType === "files"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
                onClick={() => setChartType("files")}
              >
                Files
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartType === "size"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }`}
                onClick={() => setChartType("size")}
              >
                Size (MB)
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={uploadActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(64, 64, 64)" />
              <XAxis 
                dataKey="date" 
                stroke="rgb(163, 163, 163)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgb(163, 163, 163)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(38, 38, 38)",
                  color: "rgb(212, 212, 212)",
                  borderRadius: "8px",
                  border: "none",
                }}
              />
              <Line
                type="monotone"
                dataKey={chartType}
                stroke={chartType === "files" ? "#3b82f6" : "#10b981"}
                strokeWidth={3}
                dot={{ fill: chartType === "files" ? "#3b82f6" : "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Files Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Largest Files
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Top 5 files by size
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
              <tr>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase">File</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase">Type</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase">Size</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {topFiles.map((file, index) => {
                const Icon = file.icon;
                return (
                  <tr
                    key={index}
                    className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={file.color} />
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {file.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {file.size} MB
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {file.uploaded}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}