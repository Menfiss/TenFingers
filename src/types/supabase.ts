export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      backspace_type_exe: {
        Row: {
          backspace: boolean
          id: string
        }
        Insert: {
          backspace: boolean
          id?: string
        }
        Update: {
          backspace?: boolean
          id?: string
        }
        Relationships: []
      }
      backwards_type_exe: {
        Row: {
          backwards: boolean
          id: string
        }
        Insert: {
          backwards: boolean
          id?: string
        }
        Update: {
          backwards?: boolean
          id?: string
        }
        Relationships: []
      }
      exercise_types: {
        Row: {
          backspace_id: string | null
          backwards_id: string | null
          exercise_id: string
          id: string
          survival_id: string | null
          timer_id: string | null
        }
        Insert: {
          backspace_id?: string | null
          backwards_id?: string | null
          exercise_id?: string
          id?: string
          survival_id?: string | null
          timer_id?: string | null
        }
        Update: {
          backspace_id?: string | null
          backwards_id?: string | null
          exercise_id?: string
          id?: string
          survival_id?: string | null
          timer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_types_backspace_id_fkey"
            columns: ["backspace_id"]
            isOneToOne: false
            referencedRelation: "backspace_type_exe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_types_backwards_id_fkey"
            columns: ["backwards_id"]
            isOneToOne: false
            referencedRelation: "backwards_type_exe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_types_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_types_survival_id_fkey"
            columns: ["survival_id"]
            isOneToOne: false
            referencedRelation: "survival_type_exe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_types_timer_id_fkey"
            columns: ["timer_id"]
            isOneToOne: false
            referencedRelation: "timer_type_exe"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          content: string
          id: string
          next_exercise: string | null
          prev_exercise: string | null
          section_id: string | null
        }
        Insert: {
          content: string
          id?: string
          next_exercise?: string | null
          prev_exercise?: string | null
          section_id?: string | null
        }
        Update: {
          content?: string
          id?: string
          next_exercise?: string | null
          prev_exercise?: string | null
          section_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_next_exercise_fkey"
            columns: ["next_exercise"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_prev_exercise_fkey"
            columns: ["prev_exercise"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_section_id_fkey1"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      minigame_drop_tiles: {
        Row: {
          created_at: string
          highscore: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          highscore: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          highscore?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "minigame_drop_tiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      minigame_shape_strike: {
        Row: {
          created_at: string
          highscore: number
          id: number
          user_id: string | null
          wave_count: number
        }
        Insert: {
          created_at?: string
          highscore: number
          id?: number
          user_id?: string | null
          wave_count: number
        }
        Update: {
          created_at?: string
          highscore?: number
          id?: number
          user_id?: string | null
          wave_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "minigame_shape_strike_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          id: string
          name: string
          next_section: string | null
          prev_section: string | null
        }
        Insert: {
          id?: string
          name: string
          next_section?: string | null
          prev_section?: string | null
        }
        Update: {
          id?: string
          name?: string
          next_section?: string | null
          prev_section?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_next_section_fkey"
            columns: ["next_section"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_prev_section_fkey"
            columns: ["prev_section"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      survival_type_exe: {
        Row: {
          health: number
          id: string
        }
        Insert: {
          health: number
          id?: string
        }
        Update: {
          health?: number
          id?: string
        }
        Relationships: []
      }
      timer_type_exe: {
        Row: {
          id: string
          time_sec: number
        }
        Insert: {
          id?: string
          time_sec: number
        }
        Update: {
          id?: string
          time_sec?: number
        }
        Relationships: []
      }
      user_exercises: {
        Row: {
          accuracy: number
          exercise_id: string
          id: string
          stars: number
          time: number
          user_id: string
          wpm: number
        }
        Insert: {
          accuracy: number
          exercise_id: string
          id?: string
          stars: number
          time: number
          user_id: string
          wpm: number
        }
        Update: {
          accuracy?: number
          exercise_id?: string
          id?: string
          stars?: number
          time?: number
          user_id?: string
          wpm?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_excercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_excercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          id: string
          nickname: string | null
          role: string | null
        }
        Insert: {
          email: string
          id: string
          nickname?: string | null
          role?: string | null
        }
        Update: {
          email?: string
          id?: string
          nickname?: string | null
          role?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
