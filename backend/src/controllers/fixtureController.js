import { supabase } from '../config/db.js'

export const getFixturesByTeam = async (req, res) => {
  const { teamId } = req.params

  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        id,
        match_date,
        stadium,
        stage,
        home_team:home_team_id (id, name, logo_url),
        away_team:away_team_id (id, name, logo_url),
        home_score,
        away_score,
        status
      `)
      .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
      .order('match_date', { ascending: true })  // ahora usa la columna correcta

    if (error) throw error

    res.json(data)
  } catch (err) {
    console.error('Error al obtener fixture:', err)
    res.status(500).json({ error: 'Error al obtener fixture' })
  }
}



