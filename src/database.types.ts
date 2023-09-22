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
      autorole_config: {
        Row: {
          guild: string
          id: number
          name: string
        }
        Insert: {
          guild: string
          id?: number
          name: string
        }
        Update: {
          guild?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      autoroles_roles: {
        Row: {
          group: number
          role: string
        }
        Insert: {
          group: number
          role: string
        }
        Update: {
          group?: number
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "autoroles_roles_group_fkey"
            columns: ["group"]
            referencedRelation: "autorole_config"
            referencedColumns: ["id"]
          }
        ]
      }
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
