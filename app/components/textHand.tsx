"use client";

import React, { useState, useEffect, useRef } from "react";
import localFont from "next/font/local";

const qeTonyFlores = localFont({
  src: "../../public/fonts/QETonyFlores.ttf",
  display: "swap",
});

const InteractiveTextCanvas = ({ 
  text = "26", 
  fontSize = 24 
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size to 10.5 cm x 17.5 cm (converted to pixels)
    canvas.width = 500; // 10.5 cm in pixels
    canvas.height = 662; // 17.5 cm in pixels

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the table columns dynamically
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
    
        const words = text.split(" ");
        let lines = [];
        let currentLine = words[0];
    
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
    
        // Adjust starting position to be under the header row
        const headerHeight = canvas.height / 12; 
        const startY = headerHeight + fontSize + 20;
    
        lines.forEach((line, index) => {
          ctx.fillText(
            line,
            10, 
            startY + index * lineHeight
          );
        });
      })
      .catch((err) => {
        console.error("Font loading error:", err);
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(text, 12, canvas.height / 12 + fontSize + 10); // Fallback
      });
    
  }, [text, fontSize]);

  return (
    <div className="flex max-w-4xl mx-auto p-4 space-x-4">
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