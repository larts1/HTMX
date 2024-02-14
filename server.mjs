import express from "express";
import { createClient } from "@supabase/supabase-js";

//Creates our express server
const app = express();
const port = 3000;

const supabaseUrl = "https://cndkkiainltcuzqmphxh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZGtraWFpbmx0Y3V6cW1waHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwNTc5MzcsImV4cCI6MjAyMjYzMzkzN30.RKvl3_axWH8KpehAwX8-x0IlvCmXFMsC4EuxB88fAMM";
const supabase = createClient(supabaseUrl, supabaseKey);

//Serves static files (we need it to import a css file)?%i+SUgPs~789V.
app.use(express.static("public"));
function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}
async function GetAndIncrement() {
  const {
    data: { value },
    error,
  } = await supabase.from("Test").select("value").single();
  await supabase
    .from("Test")
    .update({ value: value + 1 })
    .eq("id", 1);
  return secondsToHms(value);
}
GetAndIncrement();

//Sets a basic route
app.get("/example", async (req, res) =>
  res.json({ message: await GetAndIncrement() })
);

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
