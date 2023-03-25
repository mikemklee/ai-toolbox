import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function parseFile(req: NextApiRequest) {
  const form = formidable({
    keepExtensions: true,
  });

  return new Promise<string>((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        reject(err);
      }

      const parsedFiles = files.file as formidable.File[];
      const parsedFile = parsedFiles[0];

      resolve(parsedFile.filepath);
    });
  });
}

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
    const filepath = await parseFile(req);

    const file = fs.createReadStream(filepath);
    const resp = await openai.createTranscription(file, "whisper-1");

    res.status(200).json({ result: resp.data.text });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(error);
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
