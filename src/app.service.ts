import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BakeMaster App</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', sans-serif;
            background: #fff7f0;
            text-align: center;
          }

          h1 {
            margin-top: 40px;
            color: #d35400;
            font-size: 3em;
          }
          h2 {
            margin-top: 15px;
            color: #853a07ff;
            font-size: 1.5em;
          }

          .gallery {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 40px;
            padding: 0 20px;
          }

          .gallery img {
            width: 300px;
            height: 200px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
          }

          .gallery img:hover {
            transform: scale(1.05);
          }
        </style>
      </head>
      <body>
        <h1>BakeMaster App 🍰</h1>
        <h2>Make it with yourself — the BakeMaster way 💝</h2>
        <div class="gallery">
          <img src="https://safiabakery.uz/uploads/products/477_1740203809.jpg" alt="Cake">
          <img src="https://safiabakery.uz/uploads/products/362_1715161569.jpg" alt="Bread">
          <img src="https://safiabakery.uz/uploads/pages/page_1677591961.png" alt="Cookies">
          <img src="https://storage.kun.uz/source/uploads/2016iyulavgust/sofia2.jpg" alt="Pastry"
        </div>
      </body>
      </html>
    `;
  }
}
