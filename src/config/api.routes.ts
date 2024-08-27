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

// Crear un nuevo post usando GPT
router.post('/posts/generate', async (req, res) => {
  const author = 'Sergio Márquez';

  try {
    // Obtener los últimos 50 content_short
    const recentPostsQuery = `
      SELECT content_short
      FROM blog.posts
      ORDER BY id DESC
      LIMIT 50
    `;
    const recentPostsResult = await pool.query(recentPostsQuery);
    const recentContentShorts = recentPostsResult.rows.map((row) => row.content_short).join(', ');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente experto en tecnología, programación y creación de contenido para blogs, con un enfoque en generar artículos informativos, actualizados y en línea con las últimas tendencias en tecnología. Tu tarea es generar posts de blog que sean no solo informativos, sino también atractivos, fáciles de leer y orientados a una audiencia compuesta por programadores y entusiastas de la tecnología. Asegúrate de que el contenido siga las mejores prácticas de SEO, sea original, esté bien estructurado y dirigido a un público que busca aprender sobre las innovaciones más recientes en el campo. El resultado debe ser entregado en formato JSON, con los campos nombrados según el modelo de datos proporcionado. Aquí tienes un listado de los últimos 50 content_short para que no generes un post parecido a estos: ${recentContentShorts}`,
        },
        {
          role: 'user',
          content: `Necesito que generes un post de blog completo en formato JSON que siga la siguiente estructura basada en mi entidad Post:

                - **id**: (Generar como null, será autogenerado en la base de datos)
                - **title**: Un título atractivo y optimizado para SEO que resuma el tema principal del post. Debe captar la atención del lector y ser relevante para las tendencias actuales en tecnología y programación.
                - **content**: Un cuerpo del artículo de aproximadamente 500 a 1000 palabras, escrito en un tono profesional pero accesible. El contenido debe explicar detalladamente el tema, utilizando ejemplos cuando sea necesario, y debe mantener al lector comprometido a lo largo del texto. Es crucial que la información sea actual, precisa y útil para programadores de todos los niveles de experiencia. Además, el contenido debe ser original y no plagiar. Aparte, debes asegurarte de que el contenido sea de calidad y no sea un resumen de otras fuentes. Por favor, formatealo en formato HTML con una semántica adecuada y optimizada para SEO.
                - **contentShort**: Una breve explicación concisa, de no más de 100 caracteres, que indique claramente de qué trata el post, diferenciándose del título pero proporcionando un resumen muy directo del contenido.
                - **contentResume**: Un breve resumen de no más de 200 caracteres que resuma los puntos clave del post. Este resumen debe ser conciso, informativo y capaz de atraer al lector a profundizar en el contenido.
                - **urlSlug**: Genera un slug URL único y amigable para SEO basado en el título del artículo. Este debe ser corto, descriptivo y relevante para el contenido del post.
                - **createdAt**: (Generar como null, será autogenerado al insertar en la base de datos)
                - **updatedAt**: (Generar como null, será autogenerado al insertar en la base de datos)
                - **tags**: Una lista de 5 etiquetas relevantes para el tema del post. Estas etiquetas deben ayudar a clasificar el contenido en categorías específicas dentro del campo de la tecnología y programación.
                - **isPublished**: (Fijar como false por defecto)

                Asegúrate de que el contenido sea completamente original y pase las verificaciones de plagio. También, el estilo debe ser coherente y alineado con el tono profesional que buscan los lectores del blog. El post debe estar optimizado para SEO sin sacrificar la calidad de la información ni la legibilidad.

                Por favor, solamente devuelve el JSON bien formado, no incluyas nada más.`,
        },
      ],
    });

    if (!completion || !completion.choices || !completion.choices.length) {
      throw new Error('Respuesta de OpenAI vacía o malformada');
    }

    let postData;
    try {
      const jsonContent = completion.choices[0].message.content?.replace(/```json|```/g, '');
      postData = JSON.parse(jsonContent ?? '');
    } catch (err: any) {
      throw new Error('Error al parsear la respuesta de OpenAI: ' + err.message);
    }

    // Verificar que todos los campos necesarios estén presentes en el JSON
    const { title, content, contentShort, contentResume, urlSlug, tags } = postData;
    if (!title || !content || !contentShort || !contentResume || !urlSlug) {
      return res.status(400).json({ error: 'Faltan campos obligatorios en el JSON generado' });
    }

    const query = `
          INSERT INTO blog.posts (title, content, content_short, content_resume, author, url_slug, created_at, is_published)
          VALUES ($1, $2, $3, $4, $5, $6, NOW(), true)
          RETURNING *
        `;

    const values = [title, content, contentShort, contentResume, author, urlSlug];
    const result = await pool.query(query, values);

    const insertedPost = result.rows[0] as Post;

    // Si hay etiquetas, insertarlas en la tabla post_tags
    if (tags && tags.length > 0) {
      const tagQuery = `
            INSERT INTO blog.post_tags (post_id, tag)
            VALUES ${tags.map((_: any, i: any) => `($1, $${i + 2})`).join(', ')}
          `;
      await pool.query(tagQuery, [insertedPost.id, ...tags]);
    }

    res.status(201).json(insertedPost);
  } catch (err: any) {
    console.error('Error al generar y guardar el post:', err);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
  return;
});

export default router;
