import Footer from "@/components/Footer/Footer";
import Headers from "@/components/Headers/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Headers/>
    <Component {...pageProps} />
    <Footer/>
    </>

  )
  
}
