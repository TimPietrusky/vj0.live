"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, HelpCircle, ChevronRight, X } from "lucide-react";
import HelpPanel from "./help-panel";

// Canvas drawing functions
const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgb(10, 10, 20)");
  gradient.addColorStop(1, "rgb(5, 5, 15)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(0, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

const drawElements = (
  ctx: CanvasRenderingContext2D,
  elements: string[],
  width: number
) => {
  elements.forEach((element, index) => {
    ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
    ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    const x = 100 + ((index * 150) % (width - 200));
    const y = 100 + Math.floor((index * 150) / (width - 200)) * 150;
    ctx.beginPath();
    ctx.roundRect(x, y, 120, 80, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 255, 255, 1)";
    ctx.font = '14px "Inter", sans-serif';
    ctx.fillText(element, x + 10, y + 45);
  });
};

const drawWaveform = (
  ctx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  width: number,
  height: number
) => {
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  ctx.lineWidth = 2;
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "rgba(0, 255, 255, 0.5)");
  gradient.addColorStop(0.5, "rgba(0, 255, 255, 1)");
  gradient.addColorStop(1, "rgba(0, 255, 255, 0.5)");
  ctx.strokeStyle = gradient;
  ctx.beginPath();

  const sliceWidth = (width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
};

export function AudioVisualAppComponent() {
  const [prompt, setPrompt] = useState("");
  const [elements, setElements] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(ctx, canvas.width, canvas.height);
        drawElements(ctx, elements, canvas.width);
        if (isListening && analyserRef.current) {
          drawWaveform(ctx, analyserRef.current, canvas.width, canvas.height);
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    }
  }, [elements, isListening]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [animate]);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.toLowerCase().startsWith("add ")) {
      const newElement = prompt.slice(4);
      setElements([...elements, newElement]);
    }
    setPrompt("");
  };

  const toggleAudio = async () => {
    if (isListening) {
      setIsListening(false);
      if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
      }
    } else {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        setIsListening(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900 font-sans">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-4 right-4 z-20 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-light">
        Public Alpha
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gray-900">
        <div className="mx-auto max-w-full sm:max-w-4xl border-t-3 border-cyan-400">
          <form
            onSubmit={handlePromptSubmit}
            className="flex items-center px-2 py-2 space-x-2"
          >
            <div className="flex items-center justify-center px-1">
              <span className="text-cyan-400 font-bold text-xl">
                VJ<span className="font-mono">0</span>
              </span>
            </div>
            <div className="relative flex-grow flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Be creative..."
                className="w-full rounded-l-full bg-gray-800/50 px-4 py-2 text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out"
              />
              <button
                type="submit"
                className="rounded-r-full bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 ease-in-out"
                style={{ height: "100%", border: "none" }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`rounded-full p-2 transition-all duration-300 ease-in-out ${
                  isListening
                    ? "bg-cyan-400 text-gray-900"
                    : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
                } relative overflow-hidden`}
                onClick={toggleAudio}
                aria-label={isListening ? "Stop listening" : "Start listening"}
                style={{
                  boxShadow: isListening
                    ? "0 0 0 2px rgba(6, 182, 212, 0.5)"
                    : "none",
                }}
              >
                <Mic size={24} className="relative z-10" />
                {isListening && (
                  <span
                    className="absolute inset-0 bg-cyan-400 opacity-20"
                    style={{
                      animation:
                        "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  ></span>
                )}
              </button>
              <button
                type="button"
                className={`rounded-full p-2 transition-all duration-300 ease-in-out ${
                  isHelpOpen
                    ? "bg-cyan-400 text-gray-900"
                    : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
                } relative overflow-hidden`}
                onClick={toggleHelp}
                aria-label={isHelpOpen ? "Close help" : "Open help"}
                style={{
                  boxShadow: isHelpOpen
                    ? "0 0 0 2px rgba(6, 182, 212, 0.5)"
                    : "none",
                }}
              >
                {isHelpOpen ? (
                  <X size={24} className="relative z-10" />
                ) : (
                  <HelpCircle size={24} className="relative z-10" />
                )}
                {isHelpOpen && (
                  <span
                    className="absolute inset-0 bg-cyan-400 opacity-20"
                    style={{
                      animation:
                        "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  ></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <HelpPanel isOpen={isHelpOpen} onClose={toggleHelp} />
    </div>
  );
}
