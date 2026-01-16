'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { WorkType, needsModeSelection } from '@/lib/types';

const workTypes: { id: WorkType; title: string; description: string; icon: string }[] = [
  {
    id: 'new-project',
    title: 'New Project',
    description: 'Starting from scratch with a greenfield codebase',
    icon: '🚀',
  },
  {
    id: 'new-feature',
    title: 'New Feature',
    description: 'Adding new capability to an existing system',
    icon: '✨',
  },
  {
    id: 'enhancement',
    title: 'Enhancement',
    description: 'Improving or extending existing functionality',
    icon: '📈',
  },
  {
    id: 'spike',
    title: 'Spike / Research',
    description: 'Time-boxed exploration or learning',
    icon: '🔬',
  },
  {
    id: 'tech-debt',
    title: 'Tech Debt',
    description: 'Refactor, upgrade, or pay down technical debt',
    icon: '🔧',
  },
];

export default function Home() {
  const router = useRouter();
  const [showUpload, setShowUpload] = useState(false);

  const handleSelectWorkType = (workType: WorkType) => {
    sessionStorage.setItem('workType', workType);

    if (needsModeSelection(workType)) {
      router.push('/mode');
    } else {
      router.push('/chat');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        sessionStorage.setItem('parkedPRD', content);
        router.push('/chat?resume=true');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ralph PRD Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A conversational tool that guides you through creating well-structured
            requirements documents. Choose your work type to get started.
          </p>

          {/* Work Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {workTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelectWorkType(type.id)}
                className="text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 mb-1">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>

          {/* Resume Section */}
          <div className="border-t border-gray-200 pt-6">
            {!showUpload ? (
              <button
                onClick={() => setShowUpload(true)}
                className="w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Continue Parked Session
              </button>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".md,.json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="text-gray-600">
                    <div className="text-lg font-medium mb-2">
                      Upload your parked session
                    </div>
                    <div className="text-sm text-gray-500">
                      Click to select a file (.md, .json, or .txt)
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          Compatible with{' '}
          <a
            href="https://github.com/snarktank/ralph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ralph
          </a>
          , the autonomous AI agent loop
        </div>
      </div>
    </div>
  );
}
