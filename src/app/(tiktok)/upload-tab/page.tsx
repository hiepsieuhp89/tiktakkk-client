"use client";

import TikTokSidebar from "@/components/HomePage/TikTokSidebar";
import React, { useCallback, useRef, useState } from "react";

export default function UploadTab(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onBrowse = () => inputRef.current?.click();

  const onFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);

  return (
    <div className="h-full w-full p-6 md:p-8 text-gray-800 overflow-auto bg-gray-50 border-t border-gray-200">
      
      <div className="p-10 mx-auto">
        <div className="h-full bg-white rounded-xl shadow-lg">
          <div className="p-6 md:p-8">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`h-full rounded-xl border-2 border-dashed transition-colors ${dragOver ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-gray-50"
                }`}
            >
              <div className="flex flex-col items-center justify-center h-[500px] p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-200 mb-4" />
                <p className="text-lg font-medium mb-1">Select video to upload</p>
                <p className="text-gray-500 mb-4">Or drag and drop it here</p>
                <button
                  type="button"
                  onClick={onBrowse}
                  className="px-5 py-2 rounded-md bg-pink-500 hover:bg-pink-400 text-white"
                >
                  Select video
                </button>
                {selectedFile && (
                  <p className="mt-4 text-sm text-gray-600">Selected: {selectedFile.name}</p>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => onFiles(e.target.files)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-8 text-sm">
              <div>
                <p className="font-semibold text-gray-800">Size and duration</p>
                <p className="text-gray-600">Maximum size: 30 GB, video duration: 60 minutes.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">File formats</p>
                <p className="text-gray-600">Recommended: .mp4. Other major formats are supported.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Video resolutions</p>
                <p className="text-gray-600">High-resolution recommended: 1080p, 1440p, 4K.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Aspect ratios</p>
                <p className="text-gray-600">Recommended: 16:9 for landscape, 9:16 for vertical.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="rounded-lg border border-gray-200 p-4 text-gray-700 bg-white">
            <p className="text-sm">
              Create high quality videos on <span className="font-semibold">CapCut Online</span>. Automatically
              shorten your videos and create videos from scripts with AI-powered features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
