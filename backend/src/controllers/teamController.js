import { supabase } from '../config/db.js'

export const getTeams = async (req, res) => {
  try {
    const { data, error } = await supabase.from('teams').select('*').order('name')

    if (error) throw error

    res.json(data)
  } catch (err) {
    console.error('Error al obtener equipos:', err)
    res.status(500).json({ error: 'Error al obtener equipos' })
  }
}