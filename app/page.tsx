import Image from "next/image";
import GoogleFontsCanvas from "./components/textHand";
import InteractiveTextCanvas from "./components/textHand";
import InteractiveTextDiv from "./components/divhand";

export default function Home() {
  return (
    <>
      {/* <GoogleFontsCanvas text="Your custom text here" fontSize={24} /> */}
      <InteractiveTextDiv />
    </>
  );
}
