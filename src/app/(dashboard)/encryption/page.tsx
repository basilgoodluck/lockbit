"use client";

import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { TextInput } from "@/components/TextInput";
import { EncryptionButton } from "@/components/EncryptionButton";
import { FilePreview } from "@/components/FilePreview";
import { useEncryption } from "@/hooks/useEncryption";
import toast, { Toaster } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { Lock, HardDrive, FileText, Copy, Check, ExternalLink, Plus, ChevronDown, ChevronUp, MessageSquare, Settings, Clock, Download, Eye, Search, Filter, Upload } from "lucide-react";

export default function EncryptionPage() {
  const {
    files,
    text,
    password,
    setFiles,
    setText,
    setPassword,
    encryptedResults,
    handleEncrypt,
    handleDecrypt,
  } = useEncryption();
  const [source, setSource] = useState<"computer" | "storage">("computer");
  const [selectedStorageFiles, setSelectedStorageFiles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [hasViewedLink, setHasViewedLink] = useState(false);
  
  // Configuration options
  const [expiryTime, setExpiryTime] = useState("1h");
  const [maxDownloads, setMaxDownloads] = useState("unlimited");
  const [requirePassword, setRequirePassword] = useState(true);
  const [allowPreview, setAllowPreview] = useState(false);

  const storageFiles = [
    { id: "1", name: "report.pdf", size: 24000, type: "pdf", lastModified: 1625097600000 },
    { id: "2", name: "photo.jpg", size: 12000, type: "image", lastModified: 1625184000000 },
    { id: "3", name: "video.mp4", size: 150000, type: "video", lastModified: 1625270400000 },
    { id: "4", name: "presentation.pptx", size: 45000, type: "document", lastModified: 1625270400000 },
    { id: "5", name: "spreadsheet.xlsx", size: 32000, type: "document", lastModified: 1625270400000 },
    { id: "6", name: "image2.png", size: 18000, type: "image", lastModified: 1625270400000 },
  ];

  const filteredStorageFiles = storageFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSetFiles = (newFiles: File[]) => {
    const uniqueFiles = newFiles.filter((newFile) => {
      const isDuplicate = files.some(
        (existingFile) =>
          existingFile.name === newFile.name &&
          existingFile.size === newFile.size &&
          existingFile.lastModified === newFile.lastModified
      );
      if (isDuplicate) {
        toast.error(`File "${newFile.name}" already uploaded!`);
        return false;
      }
      return true;
    });
    setFiles([...files, ...uniqueFiles]);
    if (uniqueFiles.length > 0) {
      toast.success(`${uniqueFiles.length} file(s) added!`);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    toast.success("File removed!");
  };

  const toggleStorageFile = (fileId: string) => {
    setSelectedStorageFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleEncryptClick = () => {
    if (source === "computer" && files.length === 0) {
      toast.error("Please upload at least one file!");
      return;
    }
    if (source === "storage" && selectedStorageFiles.length === 0) {
      toast.error("Please select at least one file from storage!");
      return;
    }
    if (!password) {
      toast.error("Please enter a password!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      handleEncrypt();
      const mockLink = `https://securefiles.app/d/${Math.random().toString(36).substring(2, 10)}`;
      setGeneratedLink(mockLink);
      setShowModal(true);
      setHasViewedLink(false);
      toast.success("Files encrypted successfully!");
      setIsProcessing(false);
    }, 1500);
  };

  const handleCloseModal = () => {
    if (!hasViewedLink) {
      const confirmed = window.confirm(
        "Warning: This link will not be shown again!\n\nMake sure you've copied it before closing. Do you want to close anyway?"
      );
      if (confirmed) {
        setShowModal(false);
        setHasViewedLink(true);
      }
    } else {
      setShowModal(false);
    }
  };

  const handleCopyAndMarkViewed = () => {
    copyToClipboard();
    setHasViewedLink(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getTotalFileCount = () => {
    return source === "computer" ? files.length : selectedStorageFiles.length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              Encrypt Files
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Secure encryption with shareable links
            </p>
          </div>
          
          {/* Quick Stats */}
          {getTotalFileCount() > 0 && (
            <div className="flex items-center gap-4 px-4 py-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">{getTotalFileCount()}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">Files Selected</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - File Selection (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Source Selection Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            {/* Source Tabs - Flush with card edges */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setSource("computer")}
                className={`
                  flex-1 py-4 px-6 text-sm font-semibold transition-all relative
                  ${source === "computer"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  }
                `}
              >
                {source === "computer" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
                <div className="flex items-center justify-center gap-2">
                  <Upload size={16} />
                  Upload from Computer
                </div>
              </button>
              <button
                onClick={() => setSource("storage")}
                className={`
                  flex-1 py-4 px-6 text-sm font-semibold transition-all relative
                  ${source === "storage"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  }
                `}
              >
                {source === "storage" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
                <div className="flex items-center justify-center gap-2">
                  <HardDrive size={16} />
                  Select from Storage
                </div>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {source === "computer" ? (
                <div className="space-y-4">
                  <FileUploader files={files} setFiles={handleSetFiles} className="w-full" />
                  
                  {files.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          Selected Files ({files.length})
                        </h3>
                      </div>
                      <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-3 p-3 bg-white dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-sm transition-all"
                          >
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{file.name}</p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">{(file.size / 1000).toFixed(1)} KB</p>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition-all"
                            >
                              <FaTimesCircle size={16} className="text-rose-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Search and Filter Bar */}
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search files..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="pdf">PDF</option>
                      <option value="image">Images</option>
                      <option value="video">Videos</option>
                      <option value="document">Documents</option>
                    </select>
                  </div>

                  {/* File List with Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                        Available Files
                      </h3>
                      {selectedStorageFiles.length > 0 && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {selectedStorageFiles.length} selected
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                      {filteredStorageFiles.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
                          <HardDrive size={32} className="mx-auto mb-3 opacity-50" />
                          No files found
                        </div>
                      ) : (
                        filteredStorageFiles.map((file) => (
                          <button
                            key={file.id}
                            onClick={() => toggleStorageFile(file.id)}
                            className={`
                              w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all
                              ${selectedStorageFiles.includes(file.id)
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30"
                                : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 hover:shadow-sm"
                              }
                            `}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                              ${selectedStorageFiles.includes(file.id) ? "border-blue-600 bg-blue-600" : "border-neutral-300 dark:border-neutral-600"}
                            `}>
                              {selectedStorageFiles.includes(file.id) && <Check size={12} className="text-white" strokeWidth={3} />}
                            </div>
                            <div className="w-10 h-10 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-200 dark:border-neutral-700">
                              <FileText size={20} className="text-neutral-600 dark:text-neutral-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{file.name}</p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400">{(file.size / 1000).toFixed(1)} KB</p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Optional Message - Collapsible */}
          {source === "computer" && (
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <button
                onClick={() => setShowMessageInput(!showMessageInput)}
                className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                    <MessageSquare size={16} className="text-neutral-600 dark:text-neutral-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Add message (optional)
                  </span>
                </div>
                {showMessageInput ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
              </button>
              {showMessageInput && (
                <div className="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <TextInput text={text} setText={setText} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Encryption Settings (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Password Input - Prominent Position */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/30 rounded-lg flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                <Lock size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Encryption Password
              </h3>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter strong password"
              className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Required to encrypt and decrypt files
            </p>
          </div>

          {/* Configuration - Collapsible */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                  <Settings size={16} className="text-neutral-600 dark:text-neutral-400" />
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Advanced Settings
                </span>
              </div>
              {showConfig ? <ChevronUp size={16} className="text-neutral-400" /> : <ChevronDown size={16} className="text-neutral-400" />}
            </button>
            
            {showConfig && (
              <div className="px-4 pb-4 space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                {/* Expiry Time */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                    <Clock size={14} />
                    Link Expiry
                  </label>
                  <select
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1h">1 hour</option>
                    <option value="6h">6 hours</option>
                    <option value="24h">24 hours</option>
                    <option value="7d">7 days</option>
                    <option value="30d">30 days</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                {/* Max Downloads */}
                <div>
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                    <Download size={14} />
                    Max Downloads
                  </label>
                  <select
                    value={maxDownloads}
                    onChange={(e) => setMaxDownloads(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">1 download</option>
                    <option value="5">5 downloads</option>
                    <option value="10">10 downloads</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
                  {/* Require Password Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                      <Lock size={14} />
                      Require Password
                    </label>
                    <button
                      onClick={() => setRequirePassword(!requirePassword)}
                      className={`w-11 h-6 rounded-full transition-all ${requirePassword ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${requirePassword ? "ml-6" : "ml-1"}`} />
                    </button>
                  </div>

                  {/* Allow Preview Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                      <Eye size={14} />
                      Allow Preview
                    </label>
                    <button
                      onClick={() => setAllowPreview(!allowPreview)}
                      className={`w-11 h-6 rounded-full transition-all ${allowPreview ? "bg-blue-600" : "bg-neutral-200 dark:bg-neutral-700"}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${allowPreview ? "ml-6" : "ml-1"}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Encrypt Button - Sticky */}
          <div className="lg:sticky lg:top-6">
            <button
              onClick={handleEncryptClick}
              disabled={isProcessing || getTotalFileCount() === 0 || !password}
              className={`
                w-full py-4 rounded-xl font-semibold text-base text-white transition-all flex items-center justify-center gap-3 shadow-lg
                ${isProcessing || getTotalFileCount() === 0 || !password
                  ? "bg-neutral-200 dark:bg-neutral-800 cursor-not-allowed shadow-none opacity-60"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Encrypting Files...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Encrypt {getTotalFileCount() > 0 ? `${getTotalFileCount()} File${getTotalFileCount() > 1 ? 's' : ''}` : 'Files'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50/30 dark:from-blue-950/30 dark:to-emerald-950/20 p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Check size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      Encryption Complete!
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Your files are now secure
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all"
                >
                  <FaTimesCircle size={20} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Warning Banner */}
              {!hasViewedLink && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                      Important: Copy this link now
                    </p>
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      This link will not be shown again after closing this window
                    </p>
                  </div>
                </div>
              )}

              {/* Secure Link */}
              <div>
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 block">
                  Secure Share Link
                </label>
                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
                  <p className="text-sm font-mono text-neutral-900 dark:text-white break-all">
                    {generatedLink}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopyAndMarkViewed}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {copied ? (
                    <>
                      <Check size={16} strokeWidth={2.5} />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasViewedLink(true)}
                  className="py-3 px-5 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-semibold transition-all flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Link Details */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                  Link Settings
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={12} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Expires</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {expiryTime === "never" ? "Never" : expiryTime === "1h" ? "1 hour" : expiryTime}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Download size={12} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Max Downloads</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {maxDownloads === "unlimited" ? "Unlimited" : maxDownloads}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock size={12} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Password</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {requirePassword ? "Required" : "Not Required"}
                    </p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye size={12} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Preview</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {allowPreview ? "Allowed" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-neutral-50 dark:bg-neutral-900 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={handleCloseModal}
                className="w-full py-2.5 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium transition-all"
              >
                {hasViewedLink ? "Close" : "I've copied the link, close window"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
      
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(163 163 163 / 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(163 163 163 / 0.5);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgb(115 115 115 / 0.3);
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgb(115 115 115 / 0.5);
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom-4 {
          from { transform: translateY(1rem); }
          to { transform: translateY(0); }
        }
        @keyframes zoom-in-95 {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out, slide-in-from-bottom-4 0.2s ease-out;
        }
        .zoom-in-95 {
          animation: zoom-in-95 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
