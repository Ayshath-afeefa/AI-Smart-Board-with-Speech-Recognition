import React, { useEffect, useRef } from 'react';
import { FileText, Brain, Clock } from 'lucide-react';

interface SmartBoardProps {
  transcript: string;
  summary: string[];
  isListening: boolean;
}

const SmartBoard: React.FC<SmartBoardProps> = ({ transcript, summary, isListening }) => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const highlightKeywords = (text: string) => {
    const keywords = ['important', 'key', 'main', 'critical', 'essential', 'focus', 'primary', 'significant'];
    let highlightedText = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        `<span class="bg-yellow-200 text-yellow-800 px-1 rounded">${keyword}</span>`
      );
    });
    
    return highlightedText;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Transcript */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold text-white">Live Transcript</h2>
          {isListening && (
            <div className="ml-auto flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording</span>
            </div>
          )}
        </div>
        
        <div 
          ref={transcriptRef}
          className="h-48 overflow-y-auto bg-black/20 rounded-xl p-4"
        >
          {transcript ? (
            <p 
              className="text-white leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightKeywords(transcript) }}
            />
          ) : (
            <p className="text-gray-400 italic">Start speaking to see the transcript appear here...</p>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-blue-200">
          <span>Words: {transcript.split(' ').filter(word => word.length > 0).length}</span>
          <span>Characters: {transcript.length}</span>
        </div>
      </div>

      {/* Smart Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-purple-400" size={24} />
          <h2 className="text-xl font-semibold text-white">AI Summary</h2>
          <div className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
            {summary.length} Key Points
          </div>
        </div>
        
        <div 
          ref={summaryRef}
          className="space-y-3"
        >
          {summary.length > 0 ? (
            summary.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-white leading-relaxed">{point}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Brain className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-400 italic">Key points will appear here as you speak...</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Clock className="text-blue-400" size={20} />
            <span className="text-blue-200 text-sm">Session Time</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">
            {Math.floor(transcript.length / 200)} min
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <FileText className="text-green-400" size={20} />
            <span className="text-green-200 text-sm">Word Count</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">
            {transcript.split(' ').filter(word => word.length > 0).length}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Brain className="text-purple-400" size={20} />
            <span className="text-purple-200 text-sm">Key Points</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">{summary.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SmartBoard;