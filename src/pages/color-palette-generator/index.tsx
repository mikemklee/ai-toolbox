import Head from "next/head";
import { useState } from "react";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

export default function Page() {
  const [colorInput, setColorInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/color-palette-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: colorInput }),
      });

      console.log("response", response);

      const data = await response.json();
      console.log("data", data);

      const hexRegex = /#[A-Fa-f0-9]{6}\b/g;
      const colorSet = new Set<string>(data.result.match(hexRegex));

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(Array.from(colorSet));
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
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

            <Button onClick={onSubmit} color="secondary">
              Generate
            </Button>
          </div>

          {result && (
            <div className="mt-4 w-full flex flex-col justify-start">
              <span className="font-semibold">Palette</span>
              <div className="grid grid-cols-4 gap-4">
                {result.map((color, index) => (
                  <div
                    key={index}
                    className="w-32 h-32 p-2 rounded"
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="mt-4">Generating a palette...</div>
          ) : null}
        </main>
      </div>
    </>
  );
}
