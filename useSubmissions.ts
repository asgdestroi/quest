
import { useState, useEffect, useCallback } from 'react';
import { Submission } from '../types';

const LOCAL_STORAGE_KEY = 'artQuizSubmissions_profAndre';

export function useSubmissions(): [Submission[], (submission: Submission) => void] {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading submissions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
    } catch (error) {
      console.error("Error saving submissions to localStorage", error);
    }
  }, [submissions]);

  const addSubmission = useCallback((submission: Submission) => {
    setSubmissions(prevSubmissions => [...prevSubmissions, submission]);
  }, []);

  return [submissions, addSubmission];
}
