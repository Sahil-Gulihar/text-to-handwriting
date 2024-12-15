"use client";

import React, { useState, useRef, useEffect } from "react";
import localFont from "next/font/local";

const qeTonyFlores = localFont({
  src: "../../public/fonts/QEDSFont.ttf",
  display: "swap",
});

const TablePage = ({ pageNumber, lines, startIndex, isPreview = false }) => {
  const rows = Array(12).fill(null);

  return (
    <div className="relative w-[500px] h-[750px] border-2 border-gray-300 rounded-lg shadow-lg bg-gray-50 mb-8">
      {/* Text Display Layer */}
      <div className="absolute top-24 left-4 z-10 pointer-events-none">
        <div className={`${qeTonyFlores.className} text-2xl`}>
          {lines.slice(startIndex, startIndex + 12).map((line, index) => (
            <div key={index} className="leading-[49px]">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Table Structure */}
      <div className="w-full h-full pointer-events-none">
        <div className="grid grid-cols-[180px_200px_120px] border-b border-black">
          <div className="border-r border-black p-2 h-20 flex items-center justify-center font-medium text-sm">
            Particulars
          </div>
          <div className="border-r border-black">
            <div className="text-center p-2 border-b border-black font-medium text-sm">
              Details of actual measurement.
            </div>
            <div className="grid grid-cols-4">
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                No.
              </div>
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                L.
              </div>
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                B.
              </div>
              <div className="p-2 text-center font-medium text-sm">D.</div>
            </div>
          </div>
          <div className="p-2 flex items-center justify-center font-medium text-sm text-center">
            Contents or Area
          </div>
        </div>

        <div className="grid grid-cols-[180px_50px_50px_50px_50px_120px]">
          {rows.map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-b border-black h-[50px]" />
            </React.Fragment>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 font-medium text-sm">
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
};

const EditableTablePage = ({ pageNumber, pageText, onTextChange }) => {
  const inputRef = useRef(null);
  
  return (
    <div className="relative w-[500px] h-[750px] border-2 border-gray-300 rounded-lg shadow-lg bg-gray-50">
      <div className="absolute top-24 left-4 w-[460px] h-[588px] overflow-hidden">
        <textarea
          ref={inputRef}
          value={pageText}
          onChange={(e) => onTextChange(e.target.value)}
          className={`${qeTonyFlores.className} w-full h-full bg-transparent text-2xl leading-[49px] resize-none border-none focus:outline-none focus:ring-0 z-20 overflow-hidden`}
          autoFocus
        />
      </div>

      {/* Table Structure - Same as TablePage */}
      <div className="w-full h-full pointer-events-none">
        <div className="grid grid-cols-[180px_200px_120px] border-b border-black">
          <div className="border-r border-black p-2 h-20 flex items-center justify-center font-medium text-sm">
            Particulars
          </div>
          <div className="border-r border-black">
            <div className="text-center p-2 border-b border-black font-medium text-sm">
              Details of actual measurement.
            </div>
            <div className="grid grid-cols-4">
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                No.
              </div>
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                L.
              </div>
              <div className="border-r border-black p-2 text-center font-medium text-sm">
                B.
              </div>
              <div className="p-2 text-center font-medium text-sm">D.</div>
            </div>
          </div>
          <div className="p-2 flex items-center justify-center font-medium text-sm text-center">
            Contents or Area
          </div>
        </div>

        <div className="grid grid-cols-[180px_50px_50px_50px_50px_120px]">
          {Array(12).fill(null).map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-r border-b border-black h-[50px]" />
              <div className="border-b border-black h-[50px]" />
            </React.Fragment>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 font-medium text-sm">
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
};

const InteractiveTextDiv = () => {
  const [allPages, setAllPages] = useState([{ id: 1, text: "26" }]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageTextChange = (newText) => {
    const lines = newText.split('\n');
    if (lines.length > 12) {
      // Create new page with overflow
      const currentPageLines = lines.slice(0, 12);
      const nextPageLines = lines.slice(12);
      
      setAllPages(prev => {
        const updated = [...prev];
        updated[currentPage - 1].text = currentPageLines.join('\n');
        
        if (!updated[currentPage]) {
          updated.push({
            id: currentPage + 1,
            text: nextPageLines.join('\n')
          });
          setCurrentPage(currentPage + 1);
        }
        return updated;
      });
    } else {
      setAllPages(prev => {
        const updated = [...prev];
        updated[currentPage - 1].text = newText;
        return updated;
      });
    }
  };

  return (
    <div className="flex max-w-[1200px] mx-auto p-4 gap-8">
      {/* Input Section */}
      <div className="w-1/2 sticky top-4">
        <div className="mb-4 text-lg">Current Page: {currentPage}</div>
        <EditableTablePage
          pageNumber={currentPage}
          pageText={allPages[currentPage - 1]?.text || ""}
          onTextChange={handlePageTextChange}
        />
      </div>

      {/* Preview Section */}
      <div className="w-1/2">
        <div className="mb-4 text-lg">Preview</div>
        <div className="flex flex-col items-start">
          {allPages.map((page) => (
            <TablePage
              key={page.id}
              pageNumber={page.id}
              lines={page.text.split('\n')}
              startIndex={0}
              isPreview={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTextDiv;