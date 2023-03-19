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

  const pattern = req.body.pattern || "";
  if (pattern.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid pattern",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(pattern),
      max_tokens: 300,
      temperature: 0,
    });
    res.status(200).json({
      result: completion.data.choices[0].text,
    });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
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

function generatePrompt(pattern: string) {
  return `
    To help out the users of my form field, I would like to show them what would be a valid input into the form field, given a RegEx pattern.
    I want you to give me a description of what the RegEx pattern matches.
    For example, if the provided pattern is ^[0-9]{1,17}$, then the description would be:
      - Only contain digits between 0 and 9
      - Be between 1 and 17 digits in length
    Now, your turn. The pattern I would like you to describe is: ${pattern}
    I want the answer in a JSON array literal, where each description is an element in the array (do not include the bullet point symbol).
  `;
}

export default handler;
