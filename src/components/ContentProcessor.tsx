import React from 'react';
import { BookOpen, Play, Clock, TrendingUp, Star, Brain, FileText, Download } from 'lucide-react';
import { courseMaterials, CourseContent } from '../data/courseMaterials';

interface ContentProcessorProps {
  courseContents: CourseContent[];
  selectedContent: CourseContent | null;
  onContentUpload: (file: File) => void;
  onContentSelect: (content: CourseContent) => void;
  isProcessing: boolean;
}

const ContentProcessor: React.FC<ContentProcessorProps> = ({
  selectedContent,
  onContentSelect,
}) => {
  const subjects = [...new Set(courseMaterials.map(course => course.subject))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Computer Science':
        return '💻';
      case 'Finance':
        return '💰';
      case 'Physics':
        return '⚛️';
      case 'Biology':
        return '🧬';
      case 'Art History':
        return '🎨';
      case 'Environmental Science':
        return '🌱';
      default:
        return '📚';
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Library Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-purple-400" size={24} />
          <h2 className="text-xl font-semibold text-white">Course Library</h2>
          <div className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
            {courseMaterials.length} Courses Available
          </div>
        </div>
        
        <p className="text-purple-200 text-sm">
          Select from our curated collection of educational materials across various subjects
        </p>
      </div>

      {/* Subject Categories */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Browse by Subject</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {subjects.map((subject) => {
            const courseCount = courseMaterials.filter(course => course.subject === subject).length;
            return (
              <div
                key={subject}
                className="flex items-center gap-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors duration-200"
              >
                <span className="text-2xl">{getSubjectIcon(subject)}</span>
                <div>
                  <p className="text-white font-medium text-sm">{subject}</p>
                  <p className="text-purple-200 text-xs">{courseCount} course{courseCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Materials Grid */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="text-purple-400" size={24} />
          <h3 className="text-lg font-semibold text-white">Available Courses</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseMaterials.map((course) => (
            <div
              key={course.id}
              className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                selectedContent?.id === course.id
                  ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                  : 'bg-black/20 border-white/20 hover:bg-black/30 hover:border-white/30'
              }`}
              onClick={() => onContentSelect(course)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getSubjectIcon(course.subject)}</span>
                  <div>
                    <h4 className="text-white font-semibold text-sm leading-tight">{course.title}</h4>
                    <p className="text-purple-200 text-xs">{course.subject}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onContentSelect(course);
                  }}
                  className="flex-shrink-0 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
                >
                  <Play size={14} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </div>
                <div className="flex items-center gap-1 text-blue-300 text-xs">
                  <Clock size={12} />
                  {course.duration}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-purple-200">
                  <span className="flex items-center gap-1">
                    <Brain size={12} />
                    Summary Points
                  </span>
                  <span className="font-medium">{course.summary.length}</span>
                </div>
                <div className="flex items-center justify-between text-yellow-200">
                  <span className="flex items-center gap-1">
                    <Star size={12} />
                    Key Takeaways
                  </span>
                  <span className="font-medium">{course.criticalTakeaways.length}</span>
                </div>
              </div>

              {course.readingProgress > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-purple-300 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(course.readingProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${course.readingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Content Display */}
      {selectedContent && (
        <>
          {/* Course Overview */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getSubjectIcon(selectedContent.subject)}</span>
              <div>
                <h2 className="text-xl font-semibold text-white">{selectedContent.title}</h2>
                <p className="text-purple-200">{selectedContent.subject}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedContent.difficulty)}`}>
                  {selectedContent.difficulty}
                </div>
                <div className="flex items-center gap-1 text-blue-300 text-sm">
                  <Clock size={16} />
                  {selectedContent.duration}
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-purple-400" size={24} />
              <h2 className="text-xl font-semibold text-white">AI Summary</h2>
              <div className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                {selectedContent.summary.length} Key Points
              </div>
            </div>
            
            <div className="space-y-3">
              {selectedContent.summary.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-white leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Takeaways */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Critical Takeaways</h2>
              <div className="ml-auto bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
                {selectedContent.criticalTakeaways.length} Highlights
              </div>
            </div>
            
            <div className="space-y-3">
              {selectedContent.criticalTakeaways.map((takeaway, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20"
                >
                  <Star className="flex-shrink-0 text-yellow-400 mt-1" size={16} />
                  <p className="text-white leading-relaxed font-medium">{takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Preview */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Content Preview</h2>
              <div className="ml-auto">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>
            
            <div className="h-48 overflow-y-auto bg-black/20 rounded-xl p-4">
              <p className="text-white leading-relaxed text-sm">
                {selectedContent.content.substring(0, 1000)}
                {selectedContent.content.length > 1000 && '...'}
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-blue-200">
              <span>Characters: {selectedContent.content.length.toLocaleString()}</span>
              <span>Words: {selectedContent.content.split(' ').length.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <BookOpen className="text-purple-400" size={20} />
            <span className="text-purple-200 text-sm">Total Courses</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">{courseMaterials.length}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-green-200 text-sm">Subjects</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">{subjects.length}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Brain className="text-blue-400" size={20} />
            <span className="text-blue-200 text-sm">Avg. Summary Points</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">
            {Math.round(courseMaterials.reduce((acc, course) => acc + course.summary.length, 0) / courseMaterials.length)}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={20} />
            <span className="text-yellow-200 text-sm">Total Takeaways</span>
          </div>
          <p className="text-white text-lg font-semibold mt-1">
            {courseMaterials.reduce((acc, course) => acc + course.criticalTakeaways.length, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentProcessor;