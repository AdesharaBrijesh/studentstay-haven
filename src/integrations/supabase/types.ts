export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      amenities: {
        Row: {
          category: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          email: string
          id: string
          name: string
          phone: string
          property_id: string | null
          response_time: string | null
        }
        Insert: {
          email: string
          id?: string
          name: string
          phone: string
          property_id?: string | null
          response_time?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string
          phone?: string
          property_id?: string | null
          response_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_info_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      food_menu: {
        Row: {
          breakfast: string | null
          day_of_week: string
          dinner: string | null
          id: string
          lunch: string | null
          property_id: string | null
        }
        Insert: {
          breakfast?: string | null
          day_of_week: string
          dinner?: string | null
          id?: string
          lunch?: string | null
          property_id?: string | null
        }
        Update: {
          breakfast?: string | null
          day_of_week?: string
          dinner?: string | null
          id?: string
          lunch?: string | null
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "food_menu_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      nearby_places: {
        Row: {
          display_order: number | null
          distance: string | null
          id: string
          place_name: string
          property_id: string | null
        }
        Insert: {
          display_order?: number | null
          distance?: string | null
          id?: string
          place_name: string
          property_id?: string | null
        }
        Update: {
          display_order?: number | null
          distance?: string | null
          id?: string
          place_name?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nearby_places_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          property_id: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          property_id?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          property_id?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          gender: string | null
          id: string
          occupation: string | null
          phone: string | null
          role: string | null
          university: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          occupation?: string | null
          phone?: string | null
          role?: string | null
          university?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          occupation?: string | null
          phone?: string | null
          role?: string | null
          university?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          created_at: string | null
          description: string
          distance_to_landmark: string | null
          featured: boolean | null
          id: string
          name: string
          owner_id: string | null
          price: number
          rating: number | null
          reviews: number | null
          status: string | null
          type: Database["public"]["Enums"]["property_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          distance_to_landmark?: string | null
          featured?: boolean | null
          id?: string
          name: string
          owner_id?: string | null
          price: number
          rating?: number | null
          reviews?: number | null
          status?: string | null
          type: Database["public"]["Enums"]["property_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          distance_to_landmark?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          owner_id?: string | null
          price?: number
          rating?: number | null
          reviews?: number | null
          status?: string | null
          type?: Database["public"]["Enums"]["property_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity_id: string
          property_id: string
        }
        Insert: {
          amenity_id: string
          property_id: string
        }
        Update: {
          amenity_id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_locations: {
        Row: {
          address: string
          city: string
          id: string
          latitude: number | null
          longitude: number | null
          property_id: string | null
          state: string
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          property_id?: string | null
          state: string
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          property_id?: string | null
          state?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_locations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_photos: {
        Row: {
          caption: string | null
          display_order: number | null
          id: string
          is_primary: boolean | null
          property_id: string | null
          url: string
        }
        Insert: {
          caption?: string | null
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          property_id?: string | null
          url: string
        }
        Update: {
          caption?: string | null
          display_order?: number | null
          id?: string
          is_primary?: boolean | null
          property_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_photos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_rules: {
        Row: {
          display_order: number | null
          id: string
          property_id: string | null
          rule: string
        }
        Insert: {
          display_order?: number | null
          id?: string
          property_id?: string | null
          rule: string
        }
        Update: {
          display_order?: number | null
          id?: string
          property_id?: string | null
          rule?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_rules_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      room_details: {
        Row: {
          bathrooms: number
          bedrooms: number
          gender_policy: Database["public"]["Enums"]["gender_policy"]
          id: string
          max_occupancy: number
          property_id: string | null
          room_size: number
          room_type: Database["public"]["Enums"]["room_type"]
        }
        Insert: {
          bathrooms: number
          bedrooms: number
          gender_policy: Database["public"]["Enums"]["gender_policy"]
          id?: string
          max_occupancy: number
          property_id?: string | null
          room_size: number
          room_type: Database["public"]["Enums"]["room_type"]
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          gender_policy?: Database["public"]["Enums"]["gender_policy"]
          id?: string
          max_occupancy?: number
          property_id?: string | null
          room_size?: number
          room_type?: Database["public"]["Enums"]["room_type"]
        }
        Relationships: [
          {
            foreignKeyName: "room_details_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender_policy: "male" | "female" | "co-ed"
      property_type:
        | "student-housing"
        | "pg"
        | "dormitory"
        | "shared-house"
        | "shared-apartment"
        | "single-room"
        | "hostel"
      room_type: "private" | "shared" | "studio"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender_policy: ["male", "female", "co-ed"],
      property_type: [
        "student-housing",
        "pg",
        "dormitory",
        "shared-house",
        "shared-apartment",
        "single-room",
        "hostel",
      ],
      room_type: ["private", "shared", "studio"],
    },
  },
} as const
