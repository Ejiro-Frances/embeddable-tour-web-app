
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
          name: string
          owner_id: string
          embed_token: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          owner_id: string
          embed_token?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          owner_id?: string
          embed_token?: string
          created_at?: string
          updated_at?: string
        }
      }
      steps: {
        Row: {
          id: string
          tour_id: string
          step_id: string
          title: string
          content: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          tour_id: string
          step_id: string
          title: string
          content: string
          order: number
          created_at?: string
        }
        Update: {
          id?: string
          tour_id?: string
          step_id?: string
          title?: string
          content?: string
          order?: number
          created_at?: string
        }
      }
    }
  }
}

// Helper types
export type Tour = Database['public']['Tables']['tours']['Row']
export type Step = Database['public']['Tables']['steps']['Row']
export type TourInsert = Database['public']['Tables']['tours']['Insert']
export type StepInsert = Database['public']['Tables']['steps']['Insert']
