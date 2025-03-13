'use client';

const useEstimatedReadingTime = () => {
  const calculate = (paragraph = '') => {
    const wordsPerMinute = 200; // Assuming an average reading speed of 200 words per minute
    const wordCount = paragraph.split(/\s+/).length;
    const estimatedMinutes = Math.ceil(wordCount / wordsPerMinute);

    return estimatedMinutes;
  };

  return { calculate };
};

export default useEstimatedReadingTime;
