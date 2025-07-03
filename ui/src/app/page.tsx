import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <h1 className="text-4xl font-bold text-center">Welcome to AI Snippet</h1>
        <Link href="/snippets">
          <Button>View Snippets</Button>
        </Link>
      </div>
    </main>
  );
}
