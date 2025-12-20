import Link from "next/link"

export default function NotFound() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 sm:mb-8">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 mb-8 sm:mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-white text-black hover:bg-zinc-900 hover:text-white border border-white transition-all duration-300 font-semibold text-sm sm:text-base uppercase tracking-wider"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  )
}

