import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const file = await req.blob();

  const prompt = `Extract COM SCI, ENGR, AERO ST, APP CHM, BIO ENGR, CH ENGR, CHEM, C&EE, 
  DS BMED, EC ENGR, MAT SCI, MATH, MECH&AE, Physics, COMPTING, QNT SCI, STATS
  coursework + grades.
  Return JSON only:
  {
    "classes": [{"name": "", "grade": ""}],
    "gpa": ""
  }`;

  const result = await runVisionModel(file, prompt);
  return NextResponse.json(result);
}
