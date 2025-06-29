import Link from 'next/link';
import { CheckCircle, Code, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { LandingHeader, WaitlistForm } from '../components/landing-client-wrapper';

// Import the syntax highlighter
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <div className="w-full text-left text-sm rounded-xl border border-gray-700 bg-gray-900/80 shadow-2xl overflow-x-auto">
    <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.25rem' }}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4 text-center text-gray-200 pt-20 md:pt-28">
        <section
          className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 max-w-3xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-400 to-teal-400 animate-gradient-pan bg-[length:200%_auto]">
            The Reasoning Engine for Your App
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Introducing the Pingaroo API. Stop building fragile parsers and wrestling with embeddings. Start getting reliable, structured answers from any text with a simple, natural language prompt.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="default" className="px-8 py-3 text-lg font-semibold shadow-lg">
              <Link href="/docs"><Code className="w-5 h-5 mr-2" /> View API Docs</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-lg font-semibold border-gray-500 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
              <a href="#waitlist"><Send className="w-5 h-5 mr-2" /> Join App Waitlist</a>
            </Button>
          </div>
        </section>

        <div className="my-16 md:my-24 h-px w-3/4 max-w-xl mx-auto bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <section
          className="py-16 md:py-24 w-full"
        >
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple to Integrate. Powerful to Use.</h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">One API call is all it takes. Send us any text and a simple prompt, and get back a structured, reliable JSON object.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mt-6 mb-4">1. Define Your Rule</h3>
                <CodeBlock
                  language="bash"
                  code={`curl -X POST "https://api.pingaroo.app/v1/classify" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your invoice #4592 is past due. Please remit payment.",
    "prompt": "Is this an urgent bill or invoice?"
  }'`}
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mt-6 mb-4">2. Get a Structured Answer</h3>
                <CodeBlock
                  language="json"
                  code={`{
  "is_match": true,
  "confidence": 0.98,
  "reason": "The email contains keywords such as 'invoice', 'past due', and 'remit payment', strongly indicating it is an urgent bill."
}`}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="relative py-16 md:py-24 w-full"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Coming Soon: The Pingaroo App</h3>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto text-center">The original vision is on its way. Get SMS alerts for what truly matters. Join the waitlist to be the first to know when it launches.</p>
            <div className="flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </section>

        <div className="my-16 md:my-24 h-px w-3/4 max-w-xl mx-auto bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <section
          className="mt-16 max-w-4xl mx-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8"
        >
          {/* Security section placeholder */}
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h4 className="text-xl font-semibold text-white">Your data is safe with us</h4>
            <p className="text-gray-400">We use industry-standard encryption and strict policies to keep your data secure.</p>
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-gray-500 pb-8">
          © {new Date().getFullYear()} Pingaroo. All rights reserved.
          <span className="block sm:inline text-[10px] text-gray-600 mt-1 sm:ml-2">v1.0</span>
        </footer>
      </main>
    </>
  );
}
