import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import React from 'react';
import { CopyButton } from '@/components/copy-button';

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <div className="my-4 rounded-xl border border-gray-700 bg-gray-900/80 shadow-lg overflow-x-auto">
    <SyntaxHighlighter language={language} style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.25rem', fontSize: '0.875rem' }}>
      {code}
    </SyntaxHighlighter>
  </div>
);

const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
  <section id={id} className="py-8 border-b border-gray-800">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-purple-400 prose-code:text-purple-300 prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded-md max-w-none">
      {children}
    </div>
  </section>
);

const API_BASE_URL = 'https://api.pingaroo.app/v1';

export default function DocsPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Pingaroo API
          </Link>
          <Button asChild className="px-5 py-2 font-semibold">
            <a href="https://rapidapi.com/user/YOUR_PROFILE" target="_blank" rel="noopener noreferrer">
              Get API Key
            </a>
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-2">API Documentation</h1>
          <p className="text-lg text-gray-400 mb-12">Welcome to the Pingaroo Text Classification API. Get started in minutes.</p>

          <Section title="Introduction" id="introduction">
            <p>
              The Pingaroo API provides a powerful, hardened endpoint to classify any text against a natural language rule.
              It&apos;s designed for reliability, security, and ease of use, allowing you to build intelligent workflows without the complexity of managing your own AI models.
            </p>
          </Section>

          <Section title="Authentication" id="authentication">
            <p>
              All API requests must be authenticated using an API key. You can get your key from the RapidAPI marketplace.
              Include your API key in the <code>Authorization</code> header as a Bearer token.
            </p>
            <div className="relative">
              <CodeBlock language="bash" code={`-H "Authorization: Bearer YOUR_API_KEY"`} />
              <CopyButton textToCopy={`-H "Authorization: Bearer YOUR_API_KEY"`} />
            </div>
            <p>Requests made without a valid API key will result in a <code>401 Unauthorized</code> error.</p>
          </Section>

          <Section title="Endpoint: Classify Text" id="endpoint-classify">
            <p className="flex items-center gap-2">
              <span className="font-bold text-green-400 bg-green-900/50 px-2 py-1 rounded-md text-sm">POST</span>
              <code>{`${API_BASE_URL}/classify`}</code>
            </p>
            <p>This is the primary endpoint for the API. It accepts a JSON body containing the text to classify and the prompt to classify it against.</p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Request Body</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><code>text</code> (string, required): The text content you want to classify. Max 15,000 characters.</li>
              <li><code>prompt</code> (string, required): The natural language rule or question to evaluate the text against.</li>
              <li><code>provider</code> (string, optional): The AI provider to use. Defaults to <code>google</code>. See Tiers for allowed values.</li>
              <li><code>model</code> (string, optional): The specific model to use. Defaults to the best model for your tier. See Tiers for allowed values.</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Example Request (cURL)</h3>
            <div className="relative">
              <CodeBlock
                language="bash"
                code={`curl -X POST \"${API_BASE_URL}/classify\" \\
  -H \"Authorization: Bearer YOUR_API_KEY\" \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"text\": \"Your invoice #4592 is past due. Please remit payment.\",\n    \"prompt\": \"Is this an urgent bill or invoice?\"\n  }'`}
              />
              <CopyButton textToCopy={`curl -X POST \"${API_BASE_URL}/classify\" \\
  -H \"Authorization: Bearer YOUR_API_KEY\" \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"text\": \"Your invoice #4592 is past due. Please remit payment.\",\n    \"prompt\": \"Is this an urgent bill or invoice?\"\n  }'`} />
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Successful Response (200 OK)</h3>
            <p>A successful request returns a JSON object with the classification result.</p>
            <div className="relative">
              <CodeBlock
                language="json"
                code={`{
  "is_match": true,
  "confidence": 0.98,
  "reason": "The email contains keywords such as 'invoice', 'past due', and 'remit payment', strongly indicating it is an urgent bill."
}`}
              />
              <CopyButton textToCopy={`{
  "is_match": true,
  "confidence": 0.98,
  "reason": "The email contains keywords such as 'invoice', 'past due', and 'remit payment', strongly indicating it is an urgent bill."
}`} />
            </div>
          </Section>

          <Section title="Tiers & Rate Limits" id="tiers">
            <p>Your API key is associated with a specific tier that determines model access and rate limits. You can view your current plan and usage on the RapidAPI dashboard.</p>
            <div className="overflow-x-auto">
              <table className="w-full mt-4 text-sm text-left">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Allowed Models</th>
                    <th className="p-3">Rate Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-semibold">Free</td>
                    <td className="p-3"><code>gemini-2.5-flash-lite-preview-06-17</code></td>
                    <td className="p-3">50 requests / day</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-semibold">Pro</td>
                    <td className="p-3"><code>gemini-2.5-flash-lite-preview-06-17</code>, <code>o4-mini-2025-04-16</code></td>
                    <td className="p-3">100 requests / minute</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-semibold text-purple-400">Pro+</td>
                    <td className="p-3">All Pro models, plus <code>gemini-2.5-pro</code>. Includes &quot;Rescue Mission&quot; feature.</td>
                    <td className="p-3">300 requests / minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Error Handling" id="errors">
            <p>The API uses standard HTTP status codes to indicate the success or failure of a request.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><code>400 Bad Request</code>: Your request body is malformed or missing required fields.</li>
              <li><code>401 Unauthorized</code>: Your API key is missing or invalid.</li>
              <li><code>403 Forbidden</code>: Your tier does not have access to the requested model.</li>
              <li><code>413 Payload Too Large</code>: Your request body exceeds the 64KB limit.</li>
              <li><code>429 Too Many Requests</code>: You have exceeded your tier&apos;s rate limit.</li>
              <li><code>500 Internal Server Error</code>: A generic server error occurred. The response will contain an error ID for support.</li>
              <li><code>503 Service Unavailable</code>: The upstream AI provider (e.g., Google) is temporarily unavailable.</li>
            </ul>
          </Section>
        </div>
      </main>
    </>
  );
} 