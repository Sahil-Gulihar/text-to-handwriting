import Image from "next/image";
import GoogleFontsCanvas from "./components/textHand";

export default function Home() {
  return (
    <>
      <GoogleFontsCanvas text="Your custom text here" fontSize={24} />
    </>
  );
}
