import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeUrl } = await req.json();
    console.log("Received resume URL:", resumeUrl);

    // Simulate parsing work
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return fake parsed JSON for testing
    const mockData = {
      experiences: [
        {
          company: "OpenAI",
          responsibilities: "Built futuristic AI tools",
        },
        {
          company: "NASA",
          responsibilities: "Launched rockets and did cool space things",
        },
      ],
    };

    return NextResponse.json(mockData, { status: 200 });

  } catch (err) {
    console.error("Error in dummy parse-resume:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
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
