export interface ProcessedContent {
  summary: string[];
  criticalTakeaways: string[];
  keyTopics: string[];
  actionItems: string[];
}

export const processContent = (content: string): ProcessedContent => {
  if (!content || content.length < 100) {
    return {
      summary: [],
      criticalTakeaways: [],
      keyTopics: [],
      actionItems: []
    };
  }

  // Split content into sentences and paragraphs
  const sentences = content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 15);
  const paragraphs = content.split(/\n\s*\n/).filter(para => para.trim().length > 50);

  // Keywords for different types of content identification
  const criticalKeywords = [
    'important', 'critical', 'essential', 'key', 'fundamental', 'crucial', 'vital',
    'remember', 'note that', 'keep in mind', 'pay attention', 'focus on',
    'significant', 'major', 'primary', 'main', 'central', 'core'
  ];

  const actionKeywords = [
    'must', 'should', 'need to', 'have to', 'required to', 'ensure',
    'implement', 'apply', 'use', 'follow', 'practice', 'execute',
    'complete', 'finish', 'start', 'begin', 'initiate', 'perform'
  ];

  const topicKeywords = [
    'chapter', 'section', 'topic', 'concept', 'theory', 'principle',
    'method', 'approach', 'technique', 'strategy', 'process', 'system'
  ];

  // Generate summary points
  const summary = generateSummary(sentences, paragraphs);
  
  // Extract critical takeaways
  const criticalTakeaways = extractCriticalTakeaways(sentences, criticalKeywords);
  
  // Identify key topics
  const keyTopics = extractKeyTopics(content, topicKeywords);
  
  // Extract action items
  const actionItems = extractActionItems(sentences, actionKeywords);

  return {
    summary: summary.slice(0, 8),
    criticalTakeaways: criticalTakeaways.slice(0, 6),
    keyTopics: keyTopics.slice(0, 5),
    actionItems: actionItems.slice(0, 5)
  };
};

const generateSummary = (sentences: string[], paragraphs: string[]): string[] => {
  const summaryPoints: string[] = [];

  // Score sentences based on various factors
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;
    const lowerSentence = sentence.toLowerCase();

    // Length scoring (prefer medium-length sentences)
    if (sentence.length >= 50 && sentence.length <= 200) score += 2;
    else if (sentence.length >= 30 && sentence.length <= 300) score += 1;

    // Position scoring (first and last sentences often important)
    if (index === 0 || index === sentences.length - 1) score += 1;

    // Keyword scoring
    const importantWords = [
      'therefore', 'however', 'moreover', 'furthermore', 'consequently',
      'in conclusion', 'as a result', 'for example', 'such as', 'including',
      'definition', 'means', 'refers to', 'consists of', 'characterized by'
    ];

    importantWords.forEach(word => {
      if (lowerSentence.includes(word)) score += 2;
    });

    // Numbers and data often indicate important information
    if (/\d+/.test(sentence)) score += 1;

    // Questions are often important
    if (sentence.includes('?')) score += 1;

    return { sentence: sentence.trim(), score, index };
  });

  // Select top-scoring sentences
  const topSentences = scoredSentences
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(8, Math.ceil(sentences.length * 0.2)))
    .sort((a, b) => a.index - b.index);

  topSentences.forEach(item => {
    let sentence = item.sentence;
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    if (!/[.!?]$/.test(sentence)) sentence += '.';
    summaryPoints.push(sentence);
  });

  return summaryPoints;
};

const extractCriticalTakeaways = (sentences: string[], criticalKeywords: string[]): string[] => {
  const takeaways: string[] = [];

  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    let score = 0;

    // Check for critical keywords
    criticalKeywords.forEach(keyword => {
      if (lowerSentence.includes(keyword)) score += 2;
    });

    // Look for emphasis patterns
    const emphasisPatterns = [
      /\*\*.*?\*\*/g, // Bold text
      /\*.*?\*/g,     // Italic text
      /[A-Z]{2,}/g,   // ALL CAPS words
      /!{2,}/g        // Multiple exclamation marks
    ];

    emphasisPatterns.forEach(pattern => {
      if (pattern.test(sentence)) score += 1;
    });

    // Sentences with definitions or explanations
    if (lowerSentence.includes('is defined as') || 
        lowerSentence.includes('means that') ||
        lowerSentence.includes('refers to')) {
      score += 2;
    }

    if (score >= 2 && sentence.length >= 30 && sentence.length <= 300) {
      let cleanSentence = sentence.trim();
      cleanSentence = cleanSentence.charAt(0).toUpperCase() + cleanSentence.slice(1);
      if (!/[.!?]$/.test(cleanSentence)) cleanSentence += '.';
      takeaways.push(cleanSentence);
    }
  });

  return takeaways;
};

const extractKeyTopics = (content: string, topicKeywords: string[]): string[] => {
  const topics: string[] = [];
  const lines = content.split('\n');

  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // Look for headers (lines that are short and might be titles)
    if (trimmedLine.length > 5 && trimmedLine.length < 100) {
      // Check if it looks like a header (no punctuation at the end, capitalized)
      if (!/[.!?]$/.test(trimmedLine) && /^[A-Z]/.test(trimmedLine)) {
        topics.push(trimmedLine);
      }
    }

    // Look for topic indicators
    topicKeywords.forEach(keyword => {
      if (trimmedLine.toLowerCase().includes(keyword) && trimmedLine.length < 150) {
        topics.push(trimmedLine);
      }
    });
  });

  // Remove duplicates and return unique topics
  return [...new Set(topics)];
};

const extractActionItems = (sentences: string[], actionKeywords: string[]): string[] => {
  const actionItems: string[] = [];

  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    let isActionItem = false;

    actionKeywords.forEach(keyword => {
      if (lowerSentence.includes(keyword)) {
        isActionItem = true;
      }
    });

    // Look for imperative sentences (commands)
    const imperativePatterns = [
      /^(do|make|create|build|write|read|study|learn|practice|review|complete)/i,
      /^(remember to|don't forget to|be sure to|make sure to)/i
    ];

    imperativePatterns.forEach(pattern => {
      if (pattern.test(sentence.trim())) {
        isActionItem = true;
      }
    });

    if (isActionItem && sentence.length >= 20 && sentence.length <= 250) {
      let cleanSentence = sentence.trim();
      cleanSentence = cleanSentence.charAt(0).toUpperCase() + cleanSentence.slice(1);
      if (!/[.!?]$/.test(cleanSentence)) cleanSentence += '.';
      actionItems.push(cleanSentence);
    }
  });

  return actionItems;
};