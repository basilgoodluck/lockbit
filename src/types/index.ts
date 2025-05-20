import { User } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface MediaStats {
  videos_len: number;
  images_len: number;
  audios_len: number;
  documents_len: number;
  others_len: number;
}

export interface Activity {
  activity_type: string;
  file_name: string;
  date: string; 
  status: string;
}

export interface DashboardState {
  media: MediaStats;
  recent_activities: Activity[];
}
