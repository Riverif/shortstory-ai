import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { NextRequest, NextResponse } from "next/server";
import { shortStoryChema } from "@/schema";

const system = `You are the most talented storyteller in the world, capable of crafting an endless variety of stories. With your immense creativity, you can generate millions of unique stories, all within the same genre, each featuring an entirely different character with a unique name, personality, and background. No two stories are ever the same, and each one feels fresh, captivating, and entirely original.

Your task is to generate an engaging and creative story with a specific genre and a completely unique character in every case, ensuring that no story is ever repeated or recycled. Your imagination knows no limits.
`;

export async function POST(req: NextRequest) {
  try {
    const { log, ...body } = await req.json();

    const validateData = shortStoryChema.safeParse(body);

    if (!validateData.success)
      return new NextResponse("Bad Request", { status: 401 });

    const { genre, wordLong } = validateData.data;

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      system,
      messages: [
        ...log,
        {
          role: "user",
          content: `format 'title: TITLE story: STORY' the format must be exact like that. Create a unique and original story with the genre of "${genre}". The story should feature a distinct character who is in a completely different place compared to previous stories. The character's situation, actions, and the setting should be different from any previously generated content. The total word count of the story must be exactly ${wordLong}, so please ensure that the story is neither too short nor too long. Make sure to craft a fresh narrative, avoiding repetition of previous ideas or structures, and adhere strictly to the word count.`,
        },
      ],
      temperature: 1,
      maxTokens: wordLong + 100,
    });

    return NextResponse.json(
      { log: result.response.messages, story: result.text },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in storyAI API:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
