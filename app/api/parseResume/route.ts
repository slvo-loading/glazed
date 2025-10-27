import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const file = await req.blob();

    const prompt = `Extract structured resume info. Return JSON only:
    {
      "work_experience": [{"company": "", "bulletpoints": []}],
      "education": [{"school": "", "year": "", "graduation": ""}],
      "skills": [],
      "gpa": "",
      "awards": [],
      "certifications": [],
      "projects": [{"title": "", "bulletpoints": []}]
    }`;

    const result = await runVisionModel(file, prompt)
    return NextResponse.json(result);
}