import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <Sidebar />
      <div className="ml-[16rem] w-full h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
