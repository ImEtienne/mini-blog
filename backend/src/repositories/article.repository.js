"use strict";
const pool = require("../config/database");

async function create(article) {
    const {
        title,
        slug,
        summary,
        content,
        coverImage,
        published
    } = article;

     const query = `
        INSERT INTO articles
            (title, slug, summary, content, cover_image, published)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [title, slug, summary, content, coverImage, published];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function findAll() {
    const query = `SELECT * FROM articles ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
}

async function findBySlug(slug) {
    const query = `SELECT * FROM articles WHERE slug = $1`;
    const values = [slug];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function update(id, article) {
    const query = `
        UPDATE articles
        SET title = $1,
            slug = $2,
            summary = $3,
            content = $4,
            cover_image = $5,
            published = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
    `;
    const values = [
        article.title,
        article.slug,
        article.summary,
        article.content,
        article.coverImage,
        article.published,
        id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function remove(id) {
    const query = `DELETE FROM articles WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    create,
    findAll,
    findBySlug,
    update,
    remove
};