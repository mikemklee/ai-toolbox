import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const input = req.body.input || "";
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid input",
      },
    });
    return;
  }

  const systemMessage = `
        You are a helpful assistant. You are helping a user, who would like to use Tailwind CSS to style their application.
        Given a set of raw CSS rules, you will provide the equivalent Tailwind CSS class names.
        For example, if the user provides the CSS rule: "color: red;" then you will provide the Tailwind CSS class name: "text-red-500".
    `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: "color: red;" },
        { role: "assistant", content: "text-red-500" },
        {
          role: "user",
          content:
            "webkit-transition-property: opacity; transition-property: opacity;",
        },
        { role: "assistant", content: "transition-opacity" },
        { role: "user", content: "border-left-width: 1px;" },
        { role: "assistant", content: "border-l border-l-1" },
        { role: "user", content: input },
      ],
    });

    res.status(200).json({
      result: JSON.stringify(completion.data.choices[0]?.message?.content),
    });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

export default handler;
