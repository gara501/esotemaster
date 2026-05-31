import axios from 'axios';

import { AskRequest, AskResponse } from '../types';

function normalizeApiBaseUrl(value: string | undefined) {
  const baseUrl = value?.trim() || '/api';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

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
