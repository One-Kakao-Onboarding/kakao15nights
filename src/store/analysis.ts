import { create } from 'zustand'
import type { AnalysisResults } from '@/lib/gemini'

interface AnalysisState {
  // Input state
  uploadedImage: string | null
  uploadedFile: File | null
  selectedPersonas: string[]
  selectedDevice: string

  // Results state
  results: AnalysisResults | null
  isAnalyzing: boolean
  error: string | null

  // Actions
  setUploadedImage: (image: string | null, file: File | null) => void
  setSelectedPersonas: (personas: string[]) => void
  togglePersona: (personaId: string) => void
  setSelectedDevice: (device: string) => void
  setResults: (results: AnalysisResults | null) => void
  setIsAnalyzing: (isAnalyzing: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  uploadedImage: null,
  uploadedFile: null,
  selectedPersonas: [],
  selectedDevice: 'mobile',
  results: null,
  isAnalyzing: false,
  error: null,
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  ...initialState,

  setUploadedImage: (image, file) => set({ uploadedImage: image, uploadedFile: file }),

  setSelectedPersonas: (personas) => set({ selectedPersonas: personas }),

  togglePersona: (personaId) => set((state) => ({
    selectedPersonas: state.selectedPersonas.includes(personaId)
      ? state.selectedPersonas.filter((p) => p !== personaId)
      : [...state.selectedPersonas, personaId],
  })),

  setSelectedDevice: (device) => set((state) => ({
    selectedDevice: device,
    // Automatically deselect one-hand persona when switching to desktop
    selectedPersonas: device === 'desktop'
      ? state.selectedPersonas.filter((p) => p !== 'one-hand')
      : state.selectedPersonas,
  })),

  setResults: (results) => set({ results }),

  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}))
