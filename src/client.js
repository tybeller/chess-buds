import { createClient } from '@supabase/supabase-js'

const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
const URL = 'https://wvfnrfgounbfyuosowcu.supabase.co'

export const supabase = createClient(URL, API_KEY)