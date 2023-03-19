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

  const pattern = req.body.pattern || "";
  if (pattern.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid pattern",
      },
    });
    return;
  }

  const systemMessage = `
        You are a helpful assistant. You are helping a user to enter correct values into a form field.
        Given a RegEx pattern and a user input value, you will validate the input value and provide a helpful message in case the input value is invalid.

        Please phrase your message such that it doesn't directly mention that we are using a RegEx pattern to validate the input.
        Instead, simply describe what part of the input value is invalid, and how it needs to be changed.
    `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        {
          role: "user",
          content: `Here is the RegEx pattern: ${pattern}, and here is the user input value: ${input}`,
        },
        {
          role: "assistant",
          content:
            'Please enter a single lowercase letter without any numbers or special characters. For example, "a" or "z".',
        },
        {
          role: "user",
          content: `Here is the RegEx pattern: ${pattern}, and here is the user input value: ${input}`,
        },
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
