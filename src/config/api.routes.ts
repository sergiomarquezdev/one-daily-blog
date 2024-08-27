import { Router } from 'express';
import { pool } from './database';
import OpenAI from 'openai';
import { Post } from '../app/entities/Post';

const router = Router();
const openai = new OpenAI();

// Obtener todos los posts con paginación
router.get('/posts', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const query = `
      SELECT
        p.id,
        p.title,
        p.url_slug,
        p.content,
        p.content_resume,
        p.is_published,
        p.created_at,
        p.updated_at,
        p.author,
        ARRAY_AGG(t.tag) AS post_tags
      FROM blog.posts p
      LEFT JOIN blog.post_tags t ON p.id = t.post_id
      WHERE p.is_published = true
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    res.json(result.rows as Post[]);
  } catch (err) {
    console.error('Error en la consulta de la base de datos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener tres posts random
router.get('/posts/random', async (req, res) => {
  const { n = 3 } = req.query;
  try {
    const query = `
     SELECT
        p.id,
        p.title,
        p.url_slug,
        p.content,
        p.content_resume,
        p.is_published,
        p.created_at,
        p.updated_at,
        p.author,
        ARRAY_AGG(t.tag) AS post_tags
      FROM blog.posts p
      LEFT JOIN blog.post_tags t ON p.id = t.post_id
      WHERE p.is_published = true
      GROUP BY p.id
      ORDER BY RANDOM()
      LIMIT $1
    `;
    const result = await pool.query(query, [n]);
    res.json(result.rows as Post[]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Obtener un post específico por slug
router.get('/posts/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const query = `
        SELECT
            p.id,
            p.title,
            p.url_slug,
            p.content,
            p.content_resume,
            p.is_published,
            p.created_at,
            p.updated_at,
            p.author,
            ARRAY_AGG(t.tag) AS post_tags
        FROM blog.posts p
        LEFT JOIN blog.post_tags t ON p.id = t.post_id
        WHERE p.url_slug = $1 AND p.is_published = true
        GROUP BY p.id
      `;
    const result = await pool.query(query, [slug]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post no encontrado' });
    } else {
      res.json(result.rows[0] as Post);
    }
  } catch (err) {
    console.error('Error en la consulta de la base de datos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



export default router;
