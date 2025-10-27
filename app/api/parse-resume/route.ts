import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const ExperienceSchema = z.object({
  company: z.string(),
  responsibilities: z.string(),
});

const ResumeSchema = z.object({
  experiences: z.array(ExperienceSchema),
});

export async function POST(req: Request) {
  try {
    const { resumeUrl } = await req.json();
    console.log("Received resume URL:", resumeUrl);

    const parser = new PDFParse({ url: resumeUrl });
    const parseResult = await parser.getText();
    const resumeText = parseResult.text ?? "";

    console.log("PDF preview:", resumeText.substring(0, 500));

    const prompt = `
    Extract ONLY work experience into JSON with this structure:

    experiences: [
      {
        company: <string>,
        responsibilities: <string with bullet points separated by new lines>
      }
    ]

    Formatting rules:
    - Use '-' followed by a space for every bullet
    - One bullet per line
    - No numbering
    - No extra fields
    - Ignore education, projects, skills, etc.

    Resume Text:
    ${resumeText}`

    const aiData = await openai.responses.parse({
      model: "gpt-4o-mini",
      input: prompt,
      text: { format: zodTextFormat(ResumeSchema, "resume"), },
    });

    console.log("PARSED AI DATA:", aiData.output_parsed);

    return NextResponse.json(aiData?.output_parsed, { status: 200 });

  } catch (err) {
    console.error("Error in parse-resume:", err);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 }
    );
  }
}


// {
//   name: string;
//   email: string;
//   phone?: string;
//   education: {
//     school: string;
//     degree?: string;
//     startDate?: string;
//     endDate?: string;
//   }[];
//   experiences: {
//     title: string;
//     company: string;
//     startDate?: string;
//     endDate?: string;
//     description: string[];
//   }[];
//   skills: string[];
//   projects: {
//     name: string;
//     description: string[];
//     tech: string[];
//   }[];
// }
