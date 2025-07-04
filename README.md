# GitHub User Search Repo

## Overview

This project is a **React** web application that allows users to search for any GitHub username, view their profile and top repositories, and generate AI-powered summaries of those repositories using **Google Gemini (Generative AI)**. The app features a clean, responsive UI and demonstrates integration with both the GitHub API and Google’s generative language API.

---

## Features

- **GitHub User Search:** Enter any GitHub username to fetch and display their public profile.
- **Top Repositories:** View the user’s top 5 repositories, sorted by star count.
- **AI Summaries:** For each repository, generate a concise summary using Google Gemini AI.
- **Pagination:** Browse all repositories with easy page navigation.
- **Debounced Search:** Reduces unnecessary API calls while typing.
- **Dark Mode Toggle:** Switch between light and dark themes.
- **Responsive Design:** Works well on desktop and mobile devices.

---

## Technologies Used

- **React:** Frontend UI framework.
- **Vite:** Fast development server and build tool.
- **ReactMarkdown:** Renders AI-generated markdown summaries.
- **@google/generative-ai:** Connects to Google Gemini for AI summaries.
- **GitHub REST API:** Fetches user and repository data.
- **CSS:** Custom styles for layout and responsiveness.

---

## How It Works

1. **User Search**  
   The user enters a GitHub username in the search bar.  
   On submit, the app fetches the user’s profile and repositories from the GitHub API.

2. **Display Profile**  
   The user’s avatar, name, bio, location, and follower count are displayed.

3. **Fetch Top Repositories**  
   The app retrieves all public repositories for the user.  
   It sorts them by star count and selects the top 5.

4. **Generate AI Summaries**  
   For each top repository, the app sends the repo’s name and description to Google Gemini.  
   Gemini returns a markdown-formatted summary, which is displayed under each repo.

5. **Output**  
   The user sees a profile card, a list of top repositories, and a unique AI-generated summary for each repository.

---

## Project Structure

```
src/
  App.jsx           
  llm.js            
  components/
    Search.jsx      
    Profile.jsx     
    Repos.jsx       
  App.css           
  index.css         
main.jsx            
vite.config.js      
eslint.config.js    
```

---

## Security Note

> **API keys for GitHub and Google Gemini are currently hardcoded for demonstration.**  
> **Do NOT use this approach in production.**  
> Move all secrets to environment variables or a secure backend.

---

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

---

## Output Example
![WhatsApp Image 2025-07-04 at 16 24 24_5b464275](https://github.com/user-attachments/assets/67ec3fc0-9a97-4557-8a85-2cf37a8f6e72)
![WhatsApp Image 2025-07-04 at 16 24 24_8b13a8d3](https://github.com/user-attachments/assets/bd55d4d3-9e0b-43af-a4c9-224ef256da30)


**Demo Video:**  
[Watch here]([https://drive.google.com/file/d/1UM3JfV0O93lXM10s39lIifO7rnpBFix2/view?usp=sharing](https://drive.google.com/file/d/1UM3JfV0O93lXM10s39lIifO7rnpBFix2/view?usp=sharing))

---

## Customization

- To use your own API keys, replace them in `App.jsx` and `llm.js`.
- To change the number of top repositories, adjust the logic in `App.jsx`.

---

## Conclusion

This project demonstrates how to build a modern React application that integrates with both the GitHub API and Google Gemini AI to provide enhanced insights into open-source repositories. By implementing features such as debounced search, dark mode toggle, and repository pagination, the app offers a smooth and user-friendly experience. The AI-powered summaries add unique value by helping users quickly understand the purpose and strengths of each repository. This project can serve as a foundation for more advanced developer tools or educational platforms that leverage public code and
