import Image from "next/image";
import Home_V1 from "./(home)/home-v1/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "The Premium Homes Ltd",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <div className="flex justify-center items-center">
        <Image
          src={"https://i.ibb.co/RpzCZgw9/un.jpg"}
          alt="Banner Image"
          width={1920}
          height={1080}
          className="w-1/2"
        />
      </div>

      {/* <Home_V1 /> */}
    </Wrapper>
  );
}
