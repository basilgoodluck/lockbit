"use client";

import { useState } from "react";
import { Folder } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { FolderBox } from "@/components/dashboard/FolderBox";

const storageUsage = {
  used: 3.5,
  total: 10,
};
const creditsUsage = {
  used: 295,
  total: 500,
};

const fileTypes = [
  { type: "Videos", value: 1200 }, 
  { type: "Audio", value: 2500 },
  { type: "Images", value: 2500 }, 
  { type: "Documents", value: 800 },
  { type: "Others", value: 500 }, 
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
  { name: "report.pdf", type: "Document", size: 24, uploaded: "1 May" },
  { name: "clip.mp4", type: "Video", size: 150, uploaded: "3 May" },
  { name: "photo.jpg", type: "Image", size: 12, uploaded: "5 May" },
  { name: "song.mp3", type: "Audio", size: 8, uploaded: "2 May" },
  { name: "archive.zip", type: "Others", size: 100, uploaded: "4 May" },
];

// Chart colors
const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444"];

export default function AnalyticsPage() {
  const [chartType, setChartType] = useState<"files" | "size">("files");
  const [selectedYear, setSelectedYear] = useState("2025");

  const storageUsed = (storageUsage.used / storageUsage.total) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-amber-200 mb-6">
        Storage Analytics
      </h1>

      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md w-full mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-amber-200 mb-2">
          Storage Usage
        </h2>
        <div className="w-full bg-neutral-300 dark:bg-neutral-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-amber-500 h-4 rounded-full"
            style={{ width: `${Math.min(storageUsed, 100)}%` }}
          />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
          {storageUsage.used} GB of {storageUsage.total} GB used ({storageUsed.toFixed(0)}%)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {fileTypes.map((item) => (
          <FolderBox
            key={item.type}
            label={item.type}
            resourceCount={item.value / 100} 
            resourceType={item.type.toLowerCase()}
          />
        ))}
      </div>

      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-amber-200">
            File Type Breakdown
          </h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded"
          >
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fileTypes}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value} MB`}
            >
              {fileTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#262626",
                color: "#d4d4d4",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-amber-200">
            Upload Activity
          </h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded"
          >
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              chartType === "files"
                ? "bg-amber-500 text-neutral-900"
                : "bg-neutral-300 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            }`}
            onClick={() => setChartType("files")}
          >
            Files
          </button>
          <button
            className={`px-4 py-2 rounded ${
              chartType === "size"
                ? "bg-amber-500 text-neutral-900"
                : "bg-neutral-300 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
            }`}
            onClick={() => setChartType("size")}
          >
            Storage (MB)
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={uploadActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="date" stroke="#d4d4d4" />
            <YAxis stroke="#d4d4d4" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#262626",
                color: "#d4d4d4",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey={chartType}
              stroke={chartType === "files" ? "#f97316" : "#3b82f6"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-amber-200 mb-4">
          Top 5 Largest Files
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-neutral-900 dark:text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-300 dark:border-neutral-700">
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Size (MB)</th>
                <th className="p-2">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {topFiles.map((file, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-300 dark:border-neutral-700"
                >
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{file.type}</td>
                  <td className="p-2">{file.size}</td>
                  <td className="p-2">{file.uploaded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}