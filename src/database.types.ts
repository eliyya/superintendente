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
      guilds: {
        Row: {
          id: string
          welcome_channel: string | null
        }
        Insert: {
          id: string
          welcome_channel?: string | null
        }
        Update: {
          id?: string
          welcome_channel?: string | null
        }
        Relationships: []
      }
      welcome_config: {
        Row: {
          background: string | null
          channel: string | null
          id: string
          message: string | null
        }
        Insert: {
          background?: string | null
          channel?: string | null
          id: string
          message?: string | null
        }
        Update: {
          background?: string | null
          channel?: string | null
          id?: string
          message?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
