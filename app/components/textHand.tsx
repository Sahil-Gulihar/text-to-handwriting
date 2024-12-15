"use client";

import React, { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";

const qeTonyFlores = localFont({
  src: "../../public/fonts/QETonyFlores.ttf",
  display: "swap",
});

const InteractiveTextCanvas = () => {
  const [inputText, setInputText] = useState("26");
  const [fontSize] = useState(24);
  const [lineCount, setLineCount] = useState(1);
  const canvasRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInputText(prev => prev + '\n');
      const newLineCount = (inputText.match(/\n/g) || []).length + 2;
      setLineCount(newLineCount);
      console.log(`Current line number: ${newLineCount}`);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 662;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawTable = () => {
      const tableX = 0;
      const tableY = 0;
      const tableWidth = canvas.width;
      const tableHeight = canvas.height;
      const rows = 12;
      const columns = ["Particulars", "No.", "L", "B", "D", "Contents or Area"];

      const colWidths = [130, 50, 50, 50, 50, 130];
      const rowHeight = tableHeight / rows;

      let currentX = tableX;
      ctx.fillStyle = "#d1d5db";
      ctx.fillRect(tableX, tableY, tableWidth, rowHeight);

      ctx.font = "12px Arial";
      ctx.fillStyle = "#000";
      columns.forEach((col, index) => {
        ctx.strokeRect(currentX, tableY, colWidths[index], rowHeight);
        ctx.fillText(
          col,
          currentX + colWidths[index] / 4,
          tableY + rowHeight / 2
        );
        currentX += colWidths[index];
      });

      for (let i = 1; i <= rows; i++) {
        currentX = tableX;
        const currentY = tableY + i * rowHeight;

        for (let j = 0; j < columns.length; j++) {
          ctx.strokeRect(currentX, currentY, colWidths[j], rowHeight);
          currentX += colWidths[j];
        }
      }
    };

    drawTable();

    const customFont = new FontFace(
      "QE Tony Flores",
      `url(/fonts/QETonyFlores.ttf)`
    );
    
    customFont
      .load()
      .then((font) => {
        document.fonts.add(font);
    
        ctx.font = `${fontSize}px 'QE Tony Flores'`;
        ctx.fillStyle = "#333";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
    
        const maxWidth = canvas.width - 40;
        const lineHeight = fontSize + 25;
    
        // Split text by newlines first, then by words
        const paragraphs = inputText.split('\n');
        let lines = [];
        
        paragraphs.forEach(paragraph => {
          const words = paragraph.split(' ');
          let currentLine = words[0] || '';
          
          for (let i = 1; i < words.length; i++) {
            const testLine = currentLine + " " + words[i];
            const metrics = ctx.measureText(testLine);
    
            if (metrics.width < maxWidth) {
              currentLine = testLine;
            } else {
              lines.push(currentLine);
              currentLine = words[i];
            }
          }
          lines.push(currentLine);
        });
    
        const headerHeight = canvas.height / 12; 
        const startY = headerHeight + fontSize + 20;
    
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            10, 
            startY + index * lineHeight
          );
        });

        // Update line count based on actual rendered lines
        setLineCount(lines.length);
        console.log(`Total rendered lines: ${lines.length}`);
      })
      .catch((err) => {
        console.error("Font loading error:", err);
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(inputText, 12, canvas.height / 12 + fontSize + 10);
      });
    
  }, [inputText, fontSize]);

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4 space-y-4">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border border-gray-300 rounded-lg opacity-0 absolute top-0 left-0 focus:opacity-100 transition-opacity duration-200 resize-none"
        placeholder="Enter text here..."
        rows={lineCount}
      />
      <div className="w-full">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-300 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default InteractiveTextCanvas;