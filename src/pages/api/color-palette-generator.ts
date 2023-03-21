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
        You are a helpful assistant for a designer with good knowledge of UI/UX and color theory.
        You are helping a user explore differnt colors to use in their application.
        Given a color, you will provide a color palette that is visually appealing, based on your knowledge of color theory.

        Always provide the colors in hexadecimal format, e.g. #FF5733.
    `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: "#FF5733" },
        {
          role: "assistant",
          content: `
        
            Great, thank you for providing the base color!

            Based on the base color #FF5733, I would recommend the following color palette:

            #FFC300 (a bright yellow)
            #DAF7A6 (a light green)
            #FFC2D0 (a pale pink)
            #AED6F1 (a light blue)
            #D1D1D1 (a light grey)
            This color palette is visually appealing because it includes colors that are complementary to the base color. The bright yellow (#FFC300) creates a high contrast with the base color and draws attention to important elements. The light green (#DAF7A6) and light blue (#AED6F1) add a calming and refreshing effect, while the pale pink (#FFC2D0) adds a softness and femininity to the palette. Finally, the light grey (#D1D1D1) serves as a neutral color that can be used as a background or to balance out the other colors.

            I hope this color palette helps you in designing your application! Let me know if you need any further assistance.
        `,
        },
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
          raw: JSON.stringify(error),
        },
      });
    }
  }
}

export default handler;
