
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tours: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      steps: {
        Row: {
          id: string
          tour_id: string
          order_number: number
          title: string
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tour_id: string
          order_number: number
          title: string
          description: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tour_id?: string
          order_number?: number
          title?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      tour_analytics: {
        Row: {
          id: string
          tour_id: string
          user_id: string | null
          event_type: 'started' | 'completed' | 'abandoned' | 'step_completed' | 'step_skipped'
          step_id: string | null
          session_id: string | null
          device_type: string | null
          duration_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: string
          tour_id: string
          user_id?: string | null
          event_type: 'started' | 'completed' | 'abandoned' | 'step_completed' | 'step_skipped'
          step_id?: string | null
          session_id?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          tour_id?: string
          user_id?: string | null
          event_type?: 'started' | 'completed' | 'abandoned' | 'step_completed' | 'step_skipped'
          step_id?: string | null
          session_id?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type Tour = Database['public']['Tables']['tours']['Row']
export type Step = Database['public']['Tables']['steps']['Row']
export type TourAnalytics = Database['public']['Tables']['tour_analytics']['Row']
export type TourInsert = Database['public']['Tables']['tours']['Insert']
export type StepInsert = Database['public']['Tables']['steps']['Insert']
export type TourAnalyticsInsert = Database['public']['Tables']['tour_analytics']['Insert']

// Extended types for application use
export interface TourWithSteps extends Tour {
  steps: Step[]
}

// Stats aggregation types
export interface TourStats {
  totalToursCreated: number
  totalToursCompleted: number
  completionRate: number
  stepsSkipped: number
  averageDurationInMinutes: number // in minutes
  activeToursToday: number
  abandonRate: number
}

export interface CompletionTrend {
  day: string
  completed: number
}

export interface StepAnalytics {
  step: string
  stepId: string
  completed: number
  skipped: number
}
