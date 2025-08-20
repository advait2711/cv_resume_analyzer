import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

export const summarizeCvWithGemini = async (rawText) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your .env file.');
  }


  const prompt = `
    You are an expert HR analyst and data extractor.
    Your task is to analyze the raw text from a document and determine if it is a CV or resume.

    **Instructions:**
    1.  **Validation:** First, check if the text contains typical CV/resume sections like "Experience," "Education," "Skills," or a professional summary.
        - If it is NOT a CV/resume, return a JSON object with only one key: \`{"isValidCv": false}\`.
        - If it IS a CV/resume, proceed with the steps below and set \`"isValidCv": true\`.
    2.  **Summarize:** Create a concise, professional summary (2-4 sentences) of the candidate's profile.
    3.  **Extract Experience:** Identify all work experience. For each role, extract the company, job title, and a brief description or list of responsibilities.
    4.  **Extract Projects:** Identify all projects. For each, extract the project name and a brief description.
    5.  **Extract Education:** Identify all educational qualifications. For each, extract the institution, degree, and graduation year.
    6.  **Extract Tech Stack:** Identify all technologies, programming languages, frameworks, and tools.

    **Output Format:** Return ONLY a valid JSON object. Do not include any markdown, code fences, or explanatory text.

    **JSON Schema (for a valid CV):**
    {
      "isValidCv": true,
      "summary": "Professional summary...",
      "experience": [
        {
          "company": "Company Name",
          "title": "Job Title",
          "description": "Description of the role and responsibilities..."
        }
      ],
      "projects": [
        {
          "name": "Project Name",
          "description": "Description of the project..."
        }
      ],
      "education": [
        {
          "institution": "University Name",
          "degree": "Degree Name",
          "year": "Year"
        }
      ],
      "techStack": ["Skill 1", "Skill 2"]
    }

    **Raw Text to Analyze:**
    ---
    ${rawText}
    ---
  `;

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Gemini API Error Response:', errorBody);
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const outputText = data.candidates[0].content.parts[0].text;
    const jsonData = JSON.parse(outputText);

    return jsonData;

  } catch (error) {
    console.error('Error calling or parsing Gemini API response:', error);
    throw new Error('Failed to summarize CV using AI. Please check the server logs.');
  }
};
