import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCaiCtwdbOuUrWmuR6Z_RZPSPKj4v5dHT0'); // Your new key

export async function analyzeReposWithGemini(repos) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Only send one repo at a time to avoid 400 errors
  const repo = repos[0];
  const prompt = `
Review the following GitHub repository and provide a brief, insightful summary:
- What the project is about
- The main technologies or expertise shown
- Any unique strengths or interests

Write the summary in 2-3 sentences, starting with the repository name as a Markdown link. Make the writing clear, natural, and professional—avoid any mention of AI or automated analysis.

Repository:
Name: ${repo.name}
URL: ${repo.html_url}
Stars: ${repo.stargazers_count}
Description: ${repo.description || 'No description'}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return 'Failed to generate analysis.';
  }
}
