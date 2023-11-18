import { createClient } from '@supabase/supabase-js'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Zm5yZmdvdW5iZnl1b3Nvd2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTEyMTI5NiwiZXhwIjoyMDE0Njk3Mjk2fQ.rppv7hnH7tnxX8U1J-DfBcmJnr3b3GIGKr_TqLIfzkk'
const URL = 'https://wvfnrfgounbfyuosowcu.supabase.co'

export const supabase = createClient(URL, API_KEY)