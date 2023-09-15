import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types.js'

export const supabase = createClient<Database>(process.env.SUPABASE_URL as string, process.env.SERVICE_KEY as string)
