export const summarizeText = (text: string): string[] => {
  if (!text || text.length < 50) return [];

  // Split text into sentences
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 10);
  
  if (sentences.length < 2) return [];

  // Simple keyword-based importance scoring
  const importanceKeywords = [
    'important', 'key', 'main', 'critical', 'essential', 'focus', 'primary',
    'significant', 'major', 'crucial', 'vital', 'fundamental', 'central',
    'objective', 'goal', 'target', 'priority', 'must', 'should', 'need',
    'requirement', 'decision', 'conclusion', 'result', 'outcome', 'impact'
  ];

  const actionKeywords = [
    'will', 'shall', 'going to', 'plan to', 'need to', 'have to', 'must',
    'should', 'recommend', 'suggest', 'propose', 'decide', 'implement',
    'execute', 'deliver', 'complete', 'finish', 'start', 'begin', 'initiate'
  ];

  const timeKeywords = [
    'today', 'tomorrow', 'next week', 'next month', 'deadline', 'by',
    'before', 'after', 'during', 'schedule', 'timeline', 'urgent',
    'immediately', 'asap', 'soon', 'later', 'eventually'
  ];

  // Score sentences based on keyword presence and position
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;
    const lowerSentence = sentence.toLowerCase();
    
    // Higher score for sentences with importance keywords
    importanceKeywords.forEach(keyword => {
      if (lowerSentence.includes(keyword)) score += 3;
    });
    
    // Score for action items
    actionKeywords.forEach(keyword => {
      if (lowerSentence.includes(keyword)) score += 2;
    });
    
    // Score for time-sensitive items
    timeKeywords.forEach(keyword => {
      if (lowerSentence.includes(keyword)) score += 2;
    });
    
    // Boost score for questions (often important)
    if (sentence.includes('?')) score += 1;
    
    // Boost score for sentences with numbers (often contain data/metrics)
    if (/\d+/.test(sentence)) score += 1;
    
    // Slight boost for sentences at the beginning or end
    if (index === 0 || index === sentences.length - 1) score += 0.5;
    
    // Penalize very short sentences
    if (sentence.trim().length < 20) score -= 1;
    
    return {
      sentence: sentence.trim(),
      score,
      index
    };
  });

  // Sort by score and select top sentences
  const topSentences = scoredSentences
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, Math.ceil(sentences.length * 0.3)))
    .sort((a, b) => a.index - b.index); // Restore original order

  // Clean up and format the summary points
  const summaryPoints = topSentences.map(item => {
    let sentence = item.sentence;
    
    // Capitalize first letter
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    
    // Ensure sentence ends with punctuation
    if (!/[.!?]$/.test(sentence)) {
      sentence += '.';
    }
    
    return sentence;
  });

  // If we have very few points, try to extract key phrases
  if (summaryPoints.length < 2 && text.length > 100) {
    const keyPhrases = extractKeyPhrases(text);
    return [...summaryPoints, ...keyPhrases].slice(0, 5);
  }

  return summaryPoints;
};

const extractKeyPhrases = (text: string): string[] => {
  const phrases: string[] = [];
  
  // Look for common patterns that indicate key information
  const patterns = [
    /(?:the main|key|primary|most important)\s+[^.!?]*[.!?]/gi,
    /(?:we will|we should|we need to|we must)\s+[^.!?]*[.!?]/gi,
    /(?:the goal|objective|target|purpose)\s+[^.!?]*[.!?]/gi,
    /(?:in conclusion|to summarize|in summary)\s+[^.!?]*[.!?]/gi
  ];
  
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const cleaned = match.trim();
        if (cleaned.length > 20 && cleaned.length < 200) {
          phrases.push(cleaned);
        }
      });
    }
  });
  
  return phrases.slice(0, 3);
};