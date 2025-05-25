import Image from "next/image";

function Loading() {
  return (
    <div>
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <Image width={120} height={80} src="/assets/1.jpg" alt="logo" />
      </div>
    </div>
  );
}

export default Loading;
