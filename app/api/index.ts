import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

let configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

export const generateBlog = async ({
  topic,
  keywords,
  tone,
}: {
  topic: string;
  keywords: string;
  tone: string;
}) => {
  const prompt = `Topic: ${topic}\nKeywords: ${keywords}\nTone: ${tone}\n\nWrite a blog about ${topic} using the provided keywords. Make sure to maintain a ${tone} tone throughout the blog. Give response in HTML use only style attribute to design. Try to replicate a blog sites HTML formatting.`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages:[{role: "user", content: prompt}],
  });

  const blogContent = response.data.choices[0].message?.content;
  return blogContent;
};
