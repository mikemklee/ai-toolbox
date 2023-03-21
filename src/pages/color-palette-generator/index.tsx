import Head from "next/head";
import { useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Page() {
  const [colorInput, setColorInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    // no-op
  }

  return (
    <>
      <Head>
        <title>Color palette generator</title>
      </Head>

      <div className="flex p-8 w-full">
        <main className="flex flex-col">
          <h3 className="mb-6 text-xl font-semibold">
            Color palette generator
          </h3>

          <div className="flex items-center w-96 gap-x-2">
            <InputText
              value={colorInput}
              placeholder="Enter a color here (e.g. #f2f22f)"
              onChange={(e) => setColorInput(e.target.value)}
            />

            <Button onClick={onSubmit} color="primary">
              Generate
            </Button>
          </div>

          <div className="w-full border-gray-700 text-center py-6 px-2">
            {isLoading ? "Generating a response..." : result}
          </div>
        </main>
      </div>
    </>
  );
}
