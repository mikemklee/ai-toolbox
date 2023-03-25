import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

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

  try {
    const form = new formidable.IncomingForm();

    const parsed: formidable.Files = await new Promise((resolve, reject) => {
      form.parse(req, async function (err, fields, files) {
        if (err) {
          reject(err);
        }

        resolve(files);
      });
    });

    console.log("parsed", parsed.file);

    res.status(200).json({ message: "File parsed successfully" });
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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
