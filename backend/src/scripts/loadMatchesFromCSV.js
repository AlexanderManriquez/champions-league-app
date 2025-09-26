import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CSV_PATH = "./fixture.csv";
const BATCH_SIZE = 200;

async function insertBatch(batch) {
  if (batch.length === 0) return;
  const { error } = await supabase
    .from('matches')
    .upsert(batch, { onConflict: 'home_team_id,away_team_id,match_date' });
  if (error) {
    console.error('Error al insertar batch:', error);
    process.exit(1);
  }
} 

(async () => {
  try {
    const rows = [];
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        rows.push({
          home_team_id: Number(row.home_team_id),
          away_team_id: Number(row.away_team_id),
          match_date: row.match_date,
          stadium: row.stadium.trim(),
          stage: row.stage.trim(),
          status: row.status.trim() || 'scheduled',
          home_score: row.home_score ? Number(row.home_score) : null,
          away_score: row.away_score ? Number(row.away_score) : null,
        });
      })
      .on('end', async () => {
        console.log(`Leídas ${rows.length} filas del CSV`);
        
        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
            const batch = rows.slice(i, i + BATCH_SIZE);
            console.log(`Insertando filas ${i + 1} a ${i + batch.length} de ${rows.length}`);  
            await insertBatch(batch);
        }
        console.log('Inserción completada con éxito!');
        process.exit(0);
      });
    } catch (err) {
    console.error('Error general:', err);
    process.exit(1);
  }
})();