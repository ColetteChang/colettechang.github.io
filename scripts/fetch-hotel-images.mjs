import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const hotelsDir = path.join(process.cwd(), "public", "hotels");

const images = {
  "hilton-pool.jpg":
    "https://www.hilton.com/im/en/YWSVRHF/17140968/untitled-design.png?impolicy=crop&cw=4000&ch=2239&gravity=NorthWest&xposition=0&yposition=380&rw=1200&rh=750",
  "hilton-exterior.jpg":
    "https://images.trvl-media.com/lodging/1000000/30000/28000/27997/83170d5e.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "hilton-suite-fireplace.jpg":
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFLskAP5PSzpKvkXefBU6NSCw8s_nrqOJ9tUEndLeSC3uvfboEELmghH2JPMvvPvnM5qyxRSN9XvygSu6yS2zES6pjRHqQkG7A5JrUEjSvkLUinoguP5b1mvN-_-cE96Pz0EcdHnSHK7okb=w1200-h765-k-no",
  "hilton-lounge.jpg":
    "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG3Er4_xxCw-ROyTc6-D3T-ulPxlRw4ZJWeP_f15D_pokwxNMfXca5o87q1ydhDMhB0Ho0GSwpryuCtvPHD8jnwTH-ziDgQ4HwXPgPFF7oBagaM1MKiAYRVUYMqvtTboIkpM7qYEwxkQ4A=w1200-h803-k-no",
  "pan-pacific-exterior.jpg": "https://media.iceportal.com/83513/photos/2730883_XL.jpg",
  "aava-exterior.jpg":
    "https://www.whistlerreservations.com/wp-content/uploads/aava-whistler-hotel-exterior.jpeg",
  "westin-exterior.jpg":
    "https://images.trvl-media.com/lodging/1000000/430000/428700/428695/479114d6.jpg?impolicy=resizecrop&rw=1200&ra=fit",
};

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Referer: "https://www.expedia.com/",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  if (!res.body) throw new Error(`No body for ${url}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

fs.mkdirSync(hotelsDir, { recursive: true });

for (const [file, url] of Object.entries(images)) {
  const dest = path.join(hotelsDir, file);
  process.stdout.write(`Downloading ${file}… `);
  try {
    await download(url, dest);
    const size = fs.statSync(dest).size;
    console.log(`done (${Math.round(size / 1024)} KB)`);
  } catch (err) {
    console.log(`failed: ${err.message}`);
  }
}

console.log("\nHotel images saved to public/hotels/");
