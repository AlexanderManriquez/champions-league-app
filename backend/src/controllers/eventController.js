// src/controllers/matchController.js
import { supabase } from '../config/db.js'

export const getMatchEvents = async (req, res) => {
  const { matchId } = req.params

  try {
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .select(`
        id,
        date,
        home_team:home_team_id (id, name, logo_url),
        away_team:away_team_id (id, name, logo_url),
        home_score,
        away_score,
        status
      `)
      .eq('id', matchId)
      .single()

    if (matchError) throw matchError

    const { data: events, error: eventsError } = await supabase
      .from('match_events')
      .select(`
        id,
        minute,
        type,
        player_name,
        team_id
      `)
      .eq('match_id', matchId)
      .order('minute')

    if (eventsError) throw eventsError

    res.json({ match, events })
  } catch (err) {
    console.error('Error al obtener detalles del partido:', err)
    res.status(500).json({ error: 'Error al obtener detalles del partido' })
  }
}
