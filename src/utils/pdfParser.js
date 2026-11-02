import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
try {
  // Use official unpkg or CDN worker for browser compatibility
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.0.379'}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn("Could not set pdf workerSrc directly:", e);
}

/**
 * Extract raw text from a PDF File (File object from input)
 */
export async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText;
  } catch (err) {
    console.error('Error extracting text from PDF with pdfjs:', err);
    throw new Error('Could not parse the PDF file. Please ensure it contains selectable text.');
  }
}

/**
 * Intelligent parser that turns raw text (from PDF or copy-paste)
 * into structured questions with options A, B, C, D and answer keys.
 */
export function parseQuestionsFromRawText(rawText, defaultSection = 'reasoning') {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line breaks & tabs
  let cleaned = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');

  // Strategy:
  // Split on question boundaries: e.g. "Q1.", "Q.1", "Question 1", or "\n1.", "\n2."
  // Regex matches patterns like: (?:^|\n)\s*(?:Q(?:uestion)?[\s\.]*)?(\d+)[\.\)\:\-]\s*
  const questionRegex = /(?:^|\n)\s*(?:(?:Q|Question|प्रश्न)[\s\.\:\-]*)?(\d+)[\.\)\:\-]\s+/gi;

  const matches = [];
  let match;
  while ((match = questionRegex.exec(cleaned)) !== null) {
    matches.push({
      index: match.index,
      qNum: parseInt(match[1], 10),
      fullMatch: match[0]
    });
  }

  const rawBlocks = [];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + matches[i].fullMatch.length;
      const end = (i + 1 < matches.length) ? matches[i + 1].index : cleaned.length;
      const blockText = cleaned.substring(start, end).trim();
      rawBlocks.push({
        num: matches[i].qNum,
        text: blockText
      });
    }
  } else {
    // Fallback: If no standard numbering found, split by double newlines
    const blocks = cleaned.split(/\n\s*\n/).filter(b => b.trim().length > 20);
    blocks.forEach((b, idx) => {
      rawBlocks.push({
        num: idx + 1,
        text: b.trim()
      });
    });
  }

  const parsedQuestions = [];

  rawBlocks.forEach((block, index) => {
    const text = block.text;

    // Pattern to detect options: (A), (B), (C), (D) or A), B), C), D) or A., B., C., D.
    const optRegex = /(?:[\(\[]\s*([A-Da-d1-4])\s*[\)\]]|\b([A-Da-d1-4])[\.\)\:])\s+/g;

    const optMatches = [];
    let optMatch;
    while ((optMatch = optRegex.exec(text)) !== null) {
      const optKey = (optMatch[1] || optMatch[2]).toUpperCase();
      // Map 1, 2, 3, 4 to A, B, C, D if numeric
      const standardKey =
        optKey === '1' ? 'A' :
        optKey === '2' ? 'B' :
        optKey === '3' ? 'C' :
        optKey === '4' ? 'D' : optKey;

      optMatches.push({
        index: optMatch.index,
        endIndex: optMatch.index + optMatch[0].length,
        key: standardKey
      });
    }

    let questionStatement = text;
    let options = [];
    let detectedAnswer = 'A';
    let explanation = '';

    if (optMatches.length >= 2) {
      // The text before the first option is the question statement
      questionStatement = text.substring(0, optMatches[0].index).trim();

      // Extract each option
      for (let j = 0; j < optMatches.length; j++) {
        const cur = optMatches[j];
        const nextOptIndex = (j + 1 < optMatches.length) ? optMatches[j + 1].index : text.length;
        let optText = text.substring(cur.endIndex, nextOptIndex).trim();

        // Check if the last option text contains "Answer: X" or "Explanation: Y"
        if (j === optMatches.length - 1) {
          const ansMatch = optText.match(/(?:Ans(?:wer)?|Correct(?:\s*Option)?|उत्तर)[\s\.\:\-]+[\(\[]?\s*([A-Da-d])/i);
          if (ansMatch) {
            detectedAnswer = ansMatch[1].toUpperCase();
            optText = optText.substring(0, ansMatch.index).trim();
          }

          const expMatch = optText.match(/(?:Exp(?:lanation)?|Sol(?:ution)?|व्याख्या)[\s\.\:\-]+(.*)/is);
          if (expMatch) {
            explanation = expMatch[1].trim();
            if (!ansMatch) {
              optText = optText.substring(0, expMatch.index).trim();
            }
          }
        }

        options.push({
          key: cur.key,
          text: optText
        });
      }
    } else {
      // Could not find clear options, provide fallback template
      options = [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'C', text: 'Option C' },
        { key: 'D', text: 'Option D' }
      ];
    }

    // Ensure we have A, B, C, D
    const optionKeys = ['A', 'B', 'C', 'D'];
    const finalOptions = optionKeys.map(k => {
      const existing = options.find(o => o.key === k);
      return existing || { key: k, text: `Option ${k}` };
    });

    // Check if question statement contains inline Answer key
    const inlineAns = questionStatement.match(/(?:Ans(?:wer)?|Correct(?:\s*Option)?|उत्तर)[\s\.\:\-]+[\(\[]?\s*([A-Da-d])/i);
    if (inlineAns) {
      detectedAnswer = inlineAns[1].toUpperCase();
      questionStatement = questionStatement.substring(0, inlineAns.index).trim();
    }

    parsedQuestions.push({
      id: index + 1,
      sectionId: defaultSection,
      correctAnswer: detectedAnswer,
      en: {
        question: questionStatement || `Question ${index + 1}`,
        options: finalOptions,
        explanation: explanation || 'Refer to standard reference syllabus for step-by-step solution.'
      },
      hi: {
        question: questionStatement || `प्रश्न ${index + 1}`,
        options: finalOptions,
        explanation: explanation || 'विस्तृत समाधान के लिए संदर्भ सामग्री देखें।'
      }
    });
  });

  return parsedQuestions;
}
