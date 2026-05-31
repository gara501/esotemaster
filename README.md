# Maestro Esoterico React

React 18 + Vite + TypeScript rebuild of the original Streamlit client at
`M:\PythonProjects\esot`.

## Original Project Analysis

- `app.py`: Streamlit UI. It selects a study mode, accepts a text-area question,
  posts `{ question, mode }` to `http://localhost:8000/ask`, parses model JSON
  that may arrive wrapped in code fences, and renders either normal analytical
  answers or extract-only answers.
- `src/api.py`: FastAPI backend exposing `GET /` health and `POST /ask`.
- `src/ingest.py`: PDF ingestion from `books/*.pdf` into Chroma.
- `src/rag.py`: LangChain Chroma retrievers, Google AI Studio/Gemini models,
  Spanish prompt templates, extract mode with exact-match prioritization, and
  JSON output contracts.

The Python backend and RAG business logic remain unchanged. This React app
preserves the REST contract and migrates the frontend rendering logic.

## Run

```powershell
npm install
npm run dev
```

Start the backend separately:

```powershell
cd M:\PythonProjects\esot
.\.venv\Scripts\uvicorn.exe src.api:app --reload --host 127.0.0.1 --port 8000
```

Then open `http://localhost:5173`.

Set `VITE_API_BASE_URL=http://localhost:8000` if you do not want to use the Vite
`/api` proxy.

## Netlify

This repo includes `netlify.toml`.

Netlify settings:

```txt
Build command: npm run build
Publish directory: dist
```

Environment variable:

```env
VITE_API_BASE_URL=https://esotemasterback.onrender.com
```

Use the exact public URL of the FastAPI backend, without `/ask` at the end. The
frontend will call:

```txt
GET  {VITE_API_BASE_URL}/
POST {VITE_API_BASE_URL}/ask
```

If the backend is hosted on Render, make sure CORS allows the Netlify domain.
