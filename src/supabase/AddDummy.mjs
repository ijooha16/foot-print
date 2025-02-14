import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = "https://vylqesoiagaazywewdxj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bHFlc29pYWdhYXp5d2V3ZHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDU1NjIsImV4cCI6MjA1NTEyMTU2Mn0.MPbBwRnkbnucT37LuTFe3TjGc6hvtn1KEvPWfKyhU20";

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
const dummyUsers = [
  { email: "qwe1@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe2@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe3@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe4@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe5@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe6@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe7@gmail.com", password: "qwe1@gmail.com" },
  { email: "qwe8@gmail.com", password: "qwe1@gmail.com" },
];

async function insertDummyUsers(user) {
  const { data, error } = await supabase.auth.signUp(user);
  if (error) console.error("Error inserting data:", error);
  else console.log("Inserted data:", data);
}
dummyUsers.map(e => {
  insertDummyUsers(e);
});
