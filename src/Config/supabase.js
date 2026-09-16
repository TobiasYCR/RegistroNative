import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseURL=process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKEY=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase=createClient(
    supabaseURL,
    supabaseKEY,
    {
        auth:{
            storage:AsyncStorage,
            autoRefreshToken:true,
            persistSession:true,
            detectSessionInUrl:true,
        }
    }
)