import { supabase } from '../config/db.js';

export const updateMatchScore = async (req, res) => {
  const { id } = req.params;
  const { home_score, away_score, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('matches')
      .update({ home_score, away_score, status })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ message: "Partido actualizado", data });
  } catch (err) {
    console.error("Error al actualizar partido:", err);
    res.status(500).json({ error: "Error al actualizar partido" });
  }
};
