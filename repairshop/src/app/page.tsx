import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "var(--background-image-home-img)" }}>

    <main className="flex flex-col items-center justify-center min-h-screen  text-white p-8">

    <div className="bg-black/90 p-8 rounded-lg shadow-lg text-center text-2xl">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Repair Shop!</h1>
      <address>
        123 Main Street <br />
        Cityville, ST 12345
      </address>
      <p>Open Daily: 9:00 AM - 6:00 PM</p>
      <Link href="tel:123-456-7890" className="hover:underline text-blue-600">
        Call Us: 123-456-7890
      </Link>
    </div>

    </main>

    </div>
  );
}
