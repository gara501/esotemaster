import axios from 'axios';

import { AskRequest, AskResponse } from '../types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 180_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function askQuestion(payload: AskRequest) {
  const { data } = await apiClient.post<AskResponse>('/ask', payload);
  return data.result;
}

export async function checkApiHealth() {
  const { data } = await apiClient.get<{ status?: string; app?: string }>('/');
  return data;
}
