import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("description");

  const sections = [
    { id: "description", title: "What is vj0?" },
    { id: "features", title: "Key Features" },
    { id: "quickstart", title: "Quick Start Guide" },
    { id: "github", title: "GitHub" },
    { id: "legal", title: "Legal Information" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 ${
        // Full width on small screens, fixed width on larger screens
        "w-full sm:w-96"
      } bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } overflow-y-auto z-20`}
    >
      <div className="p-6 space-y-6 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-400">
          Help
        </h2>
        <nav className="mb-6">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full text-left p-2 rounded transition-all duration-200 ease-in-out ${
                    activeSection === section.id
                      ? "bg-cyan-400 text-gray-900 font-medium"
                      : "text-cyan-400 hover:bg-gray-800/30"
                  }`}
                >
                  {section.title}
                  <ChevronRight size={16} className="ml-auto" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-6">
          {activeSection === "description" && (
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-300">
                What is vj0?
              </h3>
              <p className="text-gray-300 mb-4">
                vj0.live is a web-based tool that generates live visual
                experiences with simple prompts.
              </p>
              <p className="text-gray-300 mb-4">
                Whether you're hosting a party, performing at a venue, or
                exploring generative art, vj0 lets you design stunning graphics
                and animations simply by typing prompts—all directly in your
                browser.
              </p>
              <p className="text-gray-300">
                What makes vj0 awesome is its simplicity and versatility. You
                don't need any technical skills or complicated setups. Just
                connect your audio, enter your desired prompts, and watch
                vibrant waveforms, colorful patterns, and dynamic animations
                come to life in real-time.
              </p>
            </section>
          )}
          {activeSection === "features" && (
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-300">
                Key Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Real-time audio visualization</li>
                <li>
                  Text-based prompt system for creating and manipulating visuals
                </li>
                <li>
                  Sleek, full-screen canvas for distraction-free creativity
                </li>
                <li>Browser-based for easy access and setup</li>
                <li>Dynamic animations and colorful patterns</li>
                <li>
                  Suitable for various settings: parties, performances, art
                  exploration
                </li>
              </ul>
            </section>
          )}
          {activeSection === "quickstart" && (
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-300">
                Quick Start Guide
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Click the microphone icon to enable audio input.</li>
                <li>More coming soon.</li>
              </ol>
            </section>
          )}
          {activeSection === "github" && (
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-300">
                GitHub
              </h3>
              <p className="mb-2 text-gray-300">
                vj0 is an open-source project. We welcome contributions, bug
                reports, and feature requests!
              </p>
              <a
                href="https://github.com/TimPietrusky/vj0.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Visit vj0 on GitHub
              </a>
            </section>
          )}
          {activeSection === "legal" && (
            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-300">
                Legal Information
              </h3>
              <p className="mb-2 text-gray-300">
                vj0 Project, founded September 2024. All rights reserved.
              </p>
              <p className="mb-2 text-gray-300">
                vj0 is released under the GNU Affero General Public License v3
                (AGPL-3.0).
              </p>
              <p className="mb-2 text-gray-300">
                Disclaimer: vj0 is provided "as is" without warranty of any
                kind, express or implied. Use at your own risk.
              </p>
              <p className="text-gray-300">
                For full legal terms and conditions, please refer to the
                documentation in the GitHub repository.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
