// import OpenAI from "openai";
// import fs from "fs";
// import path from "path";
// import { Readable } from "stream";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function runVisionModel(fileUrl: string, prompt: string) {
//     const fileResponse = await fetch(fileUrl);
//     const blob = await fileResponse.blob();

//     const result = await client.responses.create({
//         model: "gpt-4.1",
//         input: prompt,
//         attachments: [
//           {
//             data: blob,
//             type: "file",
//             mime_type: blob.type || "application/pdf"
//           }
//         ],
//         response_format: { type: "json_object" }
//       });

//   // 3️⃣ Extract clean JSON
//   const message = result.output_text; // ✅ always a string here
//   return JSON.parse(message);
// }
