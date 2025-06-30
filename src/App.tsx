import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Download, Trash2, FileText, Play, Pause, Volume2, BookOpen } from 'lucide-react';
import Avatar from './components/Avatar';
import SmartBoard from './components/SmartBoard';
import ContentProcessor from './components/ContentProcessor';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { summarizeText } from './utils/textSummarizer';
import { courseMaterials, CourseContent } from './data/courseMaterials';

interface Session {
  id: string;
  title: string;
  transcript: string;
  summary: string[];
  timestamp: Date;
}

function App() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState<string[]>([]);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  
  // Content Processing States
  const [courseContents, setCourseContents] = useState<CourseContent[]>(courseMaterials);
  const [selectedContent, setSelectedContent] = useState<CourseContent | null>(null);
  const [currentMode, setCurrentMode] = useState<'recording' | 'content'>('recording');

  const { startListening, stopListening, isListening, speechText, resetTranscript } = useSpeechRecognition();
  const { speak, stop: stopSpeaking, isPlaying, pause, resume } = useSpeechSynthesis();

  useEffect(() => {
    if (speechText) {
      setTranscript(prev => prev + ' ' + speechText);
      setIsAvatarSpeaking(true);
      
      const timer = setTimeout(() => {
        setIsAvatarSpeaking(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [speechText]);

  useEffect(() => {
    if (transcript.length > 50) {
      const newSummary = summarizeText(transcript);
      setSummary(newSummary);
    }
  }, [transcript]);

  // Handle content selection and avatar reading
  const handleContentSelect = async (content: CourseContent) => {
    setSelectedContent(content);
    setCurrentMode('content');
    
    // Switch to content mode and start reading
    setIsAvatarSpeaking(true);
    await speak(content.content, {
      onProgress: (progress) => {
        setCourseContents(prev => 
          prev.map(c => 
            c.id === content.id 
              ? { ...c, readingProgress: progress }
              : c
          )
        );
      },
      onComplete: () => {
        setIsAvatarSpeaking(false);
      }
    });
  };

  const handleStartRecording = () => {
    setCurrentMode('recording');
    if (!currentSession) {
      createNewSession();
    }
    setIsRecording(true);
    startListening();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopListening();
    if (currentSession) {
      updateCurrentSession();
    }
  };

  const createNewSession = () => {
    const newSession: Session = {
      id: Date.now().toString(),
      title: `Session ${sessions.length + 1}`,
      transcript: '',
      summary: [],
      timestamp: new Date()
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSession(newSession);
    setTranscript('');
    setSummary([]);
    resetTranscript();
  };

  const updateCurrentSession = () => {
    if (!currentSession) return;
    
    const updatedSession = {
      ...currentSession,
      transcript,
      summary
    };
    
    setSessions(prev => 
      prev.map(session => 
        session.id === currentSession.id ? updatedSession : session
      )
    );
    setCurrentSession(updatedSession);
  };

  const clearSession = () => {
    setTranscript('');
    setSummary([]);
    setCurrentSession(null);
    setSelectedContent(null);
    resetTranscript();
    stopSpeaking();
    if (isRecording) {
      handleStopRecording();
    }
  };

  const exportSession = () => {
    const exportData = currentMode === 'recording' 
      ? {
          type: 'recording_session',
          title: currentSession?.title || 'Recording Session',
          timestamp: currentSession?.timestamp || new Date(),
          transcript,
          summary,
          wordCount: transcript.split(' ').length
        }
      : {
          type: 'content_session',
          title: selectedContent?.title || 'Content Session',
          timestamp: new Date(),
          content: selectedContent?.content || '',
          summary: selectedContent?.summary || [],
          criticalTakeaways: selectedContent?.criticalTakeaways || [],
          readingProgress: selectedContent?.readingProgress || 0
        };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-board-${exportData.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Smart Board</h1>
          <p className="text-blue-200">Intelligent speech recognition, content processing, and summarization system</p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMode('recording')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentMode === 'recording'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Mic size={20} />
                Voice Recording
              </button>
              <button
                onClick={() => setCurrentMode('content')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentMode === 'content'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen size={20} />
                Content Processing
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">AI Avatar</h2>
              <Avatar 
                isListening={isListening} 
                isSpeaking={isAvatarSpeaking || isPlaying}
                mode={currentMode}
              />
              
              {/* Controls based on mode */}
              {currentMode === 'recording' ? (
                <div className="mt-6 space-y-4">
                  <div className="flex gap-3">
                    {!isRecording ? (
                      <button
                        onClick={handleStartRecording}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        <Mic size={20} />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={handleStopRecording}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        <MicOff size={20} />
                        Stop Recording
                      </button>
                    )}
                  </div>
                  
                  {isListening && (
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Listening...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {selectedContent && (
                    <div className="flex gap-2">
                      {!isPlaying ? (
                        <button
                          onClick={() => handleContentSelect(selectedContent)}
                          className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        >
                          <Play size={20} />
                          Read Aloud
                        </button>
                      ) : (
                        <button
                          onClick={stopSpeaking}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                        >
                          <Pause size={20} />
                          Stop Reading
                        </button>
                      )}
                    </div>
                  )}
                  
                  {isPlaying && selectedContent && (
                    <div className="bg-black/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Volume2 size={16} />
                        <span className="text-sm">Reading: {selectedContent.title}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedContent.readingProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {Math.round(selectedContent.readingProgress)}% complete
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={exportSession}
                  disabled={currentMode === 'recording' ? !transcript : !selectedContent}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={clearSession}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>
            </div>

            {/* Session/Content Info */}
            {currentMode === 'recording' && currentSession && (
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-medium text-white mb-2">{currentSession.title}</h3>
                <div className="text-sm text-blue-200 space-y-1">
                  <p>Started: {currentSession.timestamp.toLocaleTimeString()}</p>
                  <p>Words: {transcript.split(' ').filter(word => word.length > 0).length}</p>
                  <p>Key Points: {summary.length}</p>
                </div>
              </div>
            )}

            {currentMode === 'content' && selectedContent && (
              <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-medium text-white mb-2">{selectedContent.title}</h3>
                <div className="text-sm text-purple-200 space-y-1">
                  <p>Subject: {selectedContent.subject}</p>
                  <p>Difficulty: {selectedContent.difficulty}</p>
                  <p>Duration: {selectedContent.duration}</p>
                  <p>Summary Points: {selectedContent.summary.length}</p>
                  <p>Critical Takeaways: {selectedContent.criticalTakeaways.length}</p>
                  <p>Reading Progress: {Math.round(selectedContent.readingProgress)}%</p>
                </div>
              </div>
            )}
          </div>

          {/* Smart Board Section */}
          <div className="lg:col-span-2">
            {currentMode === 'recording' ? (
              <SmartBoard 
                transcript={transcript}
                summary={summary}
                isListening={isListening}
              />
            ) : (
              <ContentProcessor
                courseContents={courseContents}
                selectedContent={selectedContent}
                onContentUpload={() => {}} // Not used with pre-loaded content
                onContentSelect={handleContentSelect}
                isProcessing={false}
              />
            )}
          </div>
        </div>

        {/* Session History */}
        {sessions.length > 0 && currentMode === 'recording' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Session History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.slice(-6).reverse().map((session) => (
                <div
                  key={session.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    setCurrentSession(session);
                    setTranscript(session.transcript);
                    setSummary(session.summary);
                  }}
                >
                  <h3 className="font-medium text-white mb-2">{session.title}</h3>
                  <p className="text-sm text-blue-200 mb-2">
                    {session.timestamp.toLocaleDateString()} at {session.timestamp.toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-300">
                    {session.summary.length} key points • {session.transcript.split(' ').length} words
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;