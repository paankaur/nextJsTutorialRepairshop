import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full pt-3">
      <div className="mx-auto py-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found-1024x1024.png"
          alt="Page Not Found"
          title="Page Not Found"
          width={300}
          height={300}
          sizes="(max-width: 300px) 100vw, 300px"
          priority={true}
        />
        <p className="mt-4">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
