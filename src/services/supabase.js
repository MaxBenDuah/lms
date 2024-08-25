import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://unjfpbxmseuokgzzqbko.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuamZwYnhtc2V1b2tnenpxYmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMzgxNTMsImV4cCI6MjAzOTgxNDE1M30.11vhGTV24H6hIgx8NRRiHMvw0QtNd3XBf6WyTyOkSqY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
