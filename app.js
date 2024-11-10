const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const app = express();

// Base64 编码的 SVG 图像
const svgBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9Im51bGwiIHN0eWxlPSJ2ZWN0b3ItZWZmZWN0OiBub24tc2NhbGluZy1zdHJva2U7Ij4KCiA8ZyBzdHJva2U9Im51bGwiPgogIDx0aXRsZSBzdHJva2U9Im51bGwiPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IHN0cm9rZT0ibnVsbCIgZmlsbD0iI2U2ZTZlNiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjY0MiIgd2lkdGg9IjY0MiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8ZyBzdHJva2U9Im51bGwiIGNsYXNzPSJsYXllciI+CiAgPHRpdGxlIHN0cm9rZT0ibnVsbCI+TGF5ZXIgMTwvdGl0bGU+CiAgPGcgc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzEiPgogICA8cGF0aCBzdHJva2U9Im51bGwiIGlkPSJzdmdfOSIgZmlsbD0iI2ZmZmZmZiIgZD0ibTQwMi41ODQwODYsMzExLjY2ODY4MmwtMTcuNDk1NzU3LDBjLTIwLjQ2Mzc4NywwIC0zNy4wNzQzNDIsLTE2LjYxMDU1NSAtMzcuMDc0MzQyLC0zNy4wNzQzNDJsMCwtMTcuNDQzNjg2YzAsLTIwLjQ2Mzc4NyAxNi42MTA1NTUsLTM3LjA3NDM0MiAzNy4wNzQzNDIsLTM3LjA3NDM0MmwxNy40OTU3NTcsMGMyMC40NjM3ODcsMCAzNy4wNzQzNDIsMTYuNjEwNTU1IDM3LjA3NDM0MiwzNy4wNzQzNDJsMCwxNy40NDM2ODZjMC4wNTIwNzEsMjAuNDYzNzg3IC0xNi42MTA1NTUsMzcuMDc0MzQyIC0zNy4wNzQzNDIsMzcuMDc0MzQyem0tMTUuODgxNTY1LC03MC44MTYxNmMtOS44NDEzNjMsMCAtMTcuODYwMjUyLDcuOTY2ODE4IC0xNy44NjAyNTIsMTcuODYwMjUybDAsMTQuMjE1MzAzYzAsOS44NDEzNjMgNy45NjY4MTgsMTcuODYwMjUyIDE3Ljg2MDI1MiwxNy44NjAyNTJsMTQuMjY3MzczLDBjOS44NDEzNjMsMCAxNy44NjAyNTIsLTcuOTY2ODE4IDE3Ljg2MDI1MiwtMTcuODYwMjUybDAsLTE0LjIxNTMwM2MwLC05Ljg0MTM2MyAtNy45NjY4MTgsLTE3Ljg2MDI1MiAtMTcuODYwMjUyLC0xNy44NjAyNTJsLTE0LjI2NzM3MywweiIvPgogICA8cGF0aCBzdHJva2U9Im51bGwiIGlkPSJzdmdfOCIgZmlsbD0iI2ZmZmZmZiIgZD0ibTI5NS41Nzg3ODYsMjE5Ljk3MjE2OWwtMy4zODQ1OTYsMGMtMTAuNDY2MjEyLDAgLTE5Ljg5MTAxLDQuMzczOTM5IC0yNi42MDgxMzEsMTEuMjk5MzQzYy02LjcxNzEyMSwtNi45MjU0MDQgLTE2LjE5Mzk4OSwtMTEuMjk5MzQzIC0yNi42MDgxMzEsLTExLjI5OTM0M2wtMy4zODQ1OTYsMGMtMjAuNDYzNzg3LDAgLTM3LjA3NDM0MiwxNi42MTA1NTUgLTM3LjA3NDM0MiwzNy4wNzQzNDJsMCw1NC41NzAxbDIwLjgyODI4MiwwbDAsLTUyLjk1NTkwOGMwLC05Ljg0MTM2MyA3Ljk2NjgxOCwtMTcuODYwMjUyIDE3Ljg2MDI1MiwtMTcuODYwMjUybDAuMTU2MjEyLDBjOS44NDEzNjMsMCAxNy44NjAyNTIsNy45NjY4MTggMTcuODYwMjUyLDE3Ljg2MDI1MmwwLDUyLjk1NTkwOGwwLDBsMjAuODI4MjgyLDBsMCwwbDAsLTUyLjk1NTkwOGMwLC05Ljg0MTM2MyA3Ljk2NjgxOCwtMTcuODYwMjUyIDE3Ljg2MDI1MiwtMTcuODYwMjUybDAuMTU2MjEyLDBjOS44NDEzNjMsMCAxNy44NjAyNTIsNy45NjY4MTggMTcuODYwMjUyLDE3Ljg2MDI1MmwwLDUyLjk1NTkwOGwyMC44MjgyODIsMGwwLC01NC41NzAxYzAsLTIwLjQ2Mzc4NyAtMTYuNjEwNTU1LC0zNy4wNzQzNDIgLTM3LjEyNjQxMywtMzcuMDc0MzQybC0wLjA1MjA3MSwweiIvPgogICA8cGF0aCBzdHJva2U9Im51bGwiIGlkPSJzdmdfNyIgZmlsbD0iI2ZmZmZmZiIgZD0ibTQwNC40MDY1NjEsNDIwLjAyNzgybC0xNy40OTU3NTcsMGMtMjAuNDYzNzg3LDAgLTM3LjA3NDM0MiwtMTYuNjEwNTU1IC0zNy4wNzQzNDIsLTM3LjA3NDM0MmwwLC0xNy40NDM2ODZjMCwtMjAuNDYzNzg3IDE2LjYxMDU1NSwtMzcuMDc0MzQyIDM3LjA3NDM0MiwtMzcuMDc0MzQybDE3LjQ5NTc1NywwYzIwLjQ2Mzc4NywwIDM3LjA3NDM0MiwxNi42MTA1NTUgMzcuMDc0MzQyLDM3LjA3NDM0MmwwLDE3LjQ0MzY4NmMwLjA1MjA3MSwyMC40NjM3ODcgLTE2LjYxMDU1NSwzNy4wNzQzNDIgLTM3LjA3NDM0MiwzNy4wNzQzNDJ6bS0xNS44ODE1NjUsLTcwLjgxNjE2Yy05Ljg0MTM2MywwIC0xNy44NjAyNTIsNy45NjY4MTggLTE3Ljg2MDI1MiwxNy44NjAyNTJsMCwxNC4yMTUzMDNjMCw5Ljg0MTM2MyA3Ljk2NjgxOCwxNy44NjAyNTIgMTcuODYwMjUyLDE3Ljg2MDI1MmwxNC4yNjczNzMsMGM5Ljg0MTM2MywwIDE3Ljg2MDI1MiwtNy45NjY4MTggMTcuODYwMjUyLC0xNy44NjAyNTJsMCwtMTQuMjE1MzAzYzAsLTkuODQxMzYzIC03Ljk2NjgxOCwtMTcuODYwMjUyIC0xNy44NjAyNTIsLTE3Ljg2MDI1MmwtMTQuMjY3MzczLDB6Ii8+CiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z182IiBmaWxsPSIjZmZmZmZmIiBkPSJtMjk3LjM0OTE5LDMyOC4zODMzNzhsLTMuMzg0NTk2LDBjLTEwLjQ2NjIxMiwwIC0xOS44OTEwMSw0LjM3MzkzOSAtMjYuNjA4MTMxLDExLjI5OTM0M2MtNi43MTcxMjEsLTYuOTI1NDA0IC0xNi4xOTM5ODksLTExLjI5OTM0MyAtMjYuNjA4MTMxLC0xMS4yOTkzNDNsLTMuMzg0NTk2LDBjLTIwLjQ2Mzc4NywwIC0zNy4wNzQzNDIsMTYuNjEwNTU1IC0zNy4wNzQzNDIsMzcuMDc0MzQybDAsNTQuNTcwMWwyMC44MjgyODIsMGwwLC01Mi45NTU5MDhjMCwtOS44NDEzNjMgNy45NjY4MTgsLTE3Ljg2MDI1MiAxNy44NjAyNTIsLTE3Ljg2MDI1MmwwLjE1NjIxMiwwYzkuODQxMzYzLDAgMTcuODYwMjUyLDcuOTY2ODE4IDE3Ljg2MDI1MiwxNy44NjAyNTJsMCw1Mi45NTU5MDhsMCwwbDIwLjgyODI4MiwwbDAsMGwwLC01Mi45NTU5MDhjMCwtOS44NDEzNjMgNy45NjY4MTgsLTE3Ljg2MDI1MiAxNy44NjAyNTIsLTE3Ljg2MDI1MmwwLjE1NjIxMiwwYzkuODQxMzYzLDAgMTcuODYwMjUyLDcuOTY2ODE4IDE3Ljg2MDI1MiwxNy44NjAyNTJsMCw1Mi45NTU5MDhsMjAuODI4MjgyLDBsMCwtNTQuNTcwMWMwLC0yMC40NjM3ODcgLTE2LjYxMDU1NSwtMzcuMDc0MzQyIC0zNy4xMjY0MTMsLTM3LjA3NDM0MmwtMC4wNTIwNzEsMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg==';

// 修改程序以使用 Base64 SVG
app.get('/:size/:bgColor?/:fgColor?', async (req, res) => {
  const { size, bgColor = 'e6e6e6', fgColor = '909090' } = req.params;
  const { text } = req.query;

  let width, height;
  if (size.includes('x')) {
    [width, height] = size.split('x').map(Number);
  } else {
    width = height = Number(size);
  }

  if (!width || !height || isNaN(width) || isNaN(height)) {
    return res.status(400).send('Invalid size parameter');
  }

  const displayText = text || '';

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  try {
    const image = await loadImage(svgBase64);

    // 保持寬高比，計算縮放和繪製位置
    const aspectRatio = image.width / image.height;
    let drawWidth, drawHeight;
    if (width / height > aspectRatio) {
      drawHeight = height;
      drawWidth = height * aspectRatio;
    } else {
      drawWidth = width;
      drawHeight = width / aspectRatio;
    }
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    // 繪製背景圖片
    ctx.fillStyle = `#${bgColor}`;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, x, y, drawWidth, drawHeight);
  } catch (error) {
    console.error('Error loading SVG image:', error);
    ctx.fillStyle = `#${bgColor}`;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.fillStyle = `#${fgColor}`;
  const fontSize = Math.min(width, height) / 5;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(displayText, width / 2, height / 2);

  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器正在執行於 http://localhost:${PORT}`);
});
