// app/page.tsx

import ServerSession from "./components/ServerSession";

export default function HomePage() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MyApp Home</h1>
      <ServerSession />
    </main>
  )
}
