import { create } from 'zustand';

import { askQuestion } from '../utils/api';
import { parseModelResponse } from '../utils/responseParser';
import { ModelResult, StudyMode } from '../types';

interface EsotericState {
  mode: StudyMode;
  question: string;
  result: ModelResult | null;
  rawResult: unknown;
  isLoading: boolean;
  error: string | null;
  setMode: (mode: StudyMode) => void;
  setQuestion: (question: string) => void;
  clearResult: () => void;
  submitQuestion: () => Promise<void>;
}

export const useEsotericStore = create<EsotericState>((set, get) => ({
  mode: 'general',
  question: '',
  result: null,
  rawResult: null,
  isLoading: false,
  error: null,
  setMode: (mode) => set({ mode }),
  setQuestion: (question) => set({ question }),
  clearResult: () => set({ result: null, rawResult: null, error: null }),
  submitQuestion: async () => {
    const { mode, question } = get();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      set({ error: 'Escribe una pregunta.' });
      return;
    }

    set({ isLoading: true, error: null, result: null, rawResult: null });

    try {
      const rawResult = await askQuestion({
        question: trimmedQuestion,
        mode,
      });
      const result = parseModelResponse(rawResult);

      set({
        result,
        rawResult,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof SyntaxError
          ? 'La respuesta no llego como JSON valido.'
          : error instanceof Error
            ? error.message
            : 'Ocurrio un error procesando la respuesta.';

      set({
        error: message,
        rawResult: get().rawResult,
        isLoading: false,
      });
    }
  },
}));
