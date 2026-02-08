'use client';

import React, { useState } from 'react';
import ProposalCard from '@/components/ProposalCard';
import { Copy, Check } from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('My Love');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/proposal?name=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Editor Section */}
      <div className="w-full md:w-1/3 p-8 bg-gray-50 border-r border-gray-200 shadow-md z-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Your Valentine Proposal 💖
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Who is this for?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-black"
              placeholder="Enter their name..."
            />
          </div>

          <button
            onClick={handleCopyLink}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${copied
              ? 'bg-green-500 text-white'
              : 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg'
              }`}
          >
            {copied ? (
              <>
                <Check size={20} />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy size={20} />
                <span>Copy Proposal Link</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Customize the name and copy the link to send to your special someone!
            The preview on the right shows exactly what they'll see.
          </p>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-2/3 bg-pink-100 relative">
        <div className="absolute top-4 right-4 bg-black/10 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 uppercase tracking-wider backdrop-blur-sm z-20">
          Live Preview
        </div>
        <ProposalCard name={name} interactive={true} />
      </div>
    </div>
  );
}
