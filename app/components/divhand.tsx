"use client";

import React, { useState, useRef, useEffect } from "react";
import localFont from "next/font/local";

const qeTonyFlores = localFont({
  src: "../../public/fonts/QETonyFlores.ttf",
  display: "swap",
});

const TablePage = ({ pageNumber, lines, startIndex, isActive, onFocus, onTextChange, allText }) => {
  const inputRef = useRef(null);
  const rows = Array(12).fill(null);

  const handleInput = (e) => {
    const newText = e.target.value;
    onTextChange(newText);
  };

  return (
    <div 
      className="relative w-[500px] h-[750px] border-2 border-gray-300 rounded-lg shadow-lg bg-gray-50 mb-8 cursor-text"
      onClick={() => {
        if (isActive) {
          inputRef.current?.focus();
        } else {
          onFocus(pageNumber);
        }
      }}
    >
      {/* Hidden textarea that follows cursor */}
      {isActive && (
        <textarea
          ref={inputRef}
          value={allText}
          onChange={handleInput}
          className={`${qeTonyFlores.className} absolute top-24 left-4 w-[460px] h-[600px] bg-transparent text-2xl leading-[49px] resize-none border-none focus:outline-none focus:ring-0 z-20`}
          autoFocus
        />
      )}

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
        {/* Header Row */}
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

        {/* Table Body */}
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

        {/* Page Number */}
        <div className="absolute bottom-4 right-4 font-medium text-sm">
          Page {pageNumber}
        </div>
      </div>
    </div>
  );
};

const InteractiveTextDiv = () => {
  const [text, setText] = useState("26");
  const [activePage, setActivePage] = useState(1);

  const handleTextChange = (newText) => {
    setText(newText);
  };

  // Calculate pages based on line count
  const lines = text.split("\n");
  const linesPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(lines.length / linesPerPage));
  
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: i + 1,
    startIndex: i * linesPerPage,
    lines: lines
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center">
        {pages.map((page) => (
          <TablePage
            key={page.pageNumber}
            pageNumber={page.pageNumber}
            lines={page.lines}
            startIndex={page.startIndex}
            isActive={page.pageNumber === activePage}
            onFocus={setActivePage}
            onTextChange={handleTextChange}
            allText={text}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveTextDiv;