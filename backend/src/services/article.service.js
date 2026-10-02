const articleRepository = require("../repositories/article.repository");


function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

async function createArticle(data) {
    if (!data.title) {
        throw new Error("Title is required");
    }

    if (!data.content) {
        throw new Error("Content is required");
    }

    const article = {
        title: data.title,
        slug: generateSlug(data.title),
        summary: data.summary || null,
        content: data.content,
        coverImage: data.coverImage || null,
        published: data.published ?? false
    };

    return articleRepository.create(article);
}

/**
 * Get all articles.
 * @returns {Array} The list of articles.
 * @throws {Error} If no articles are found.
 */
async function getArticles() {
    const article = await articleRepository.findAll();
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
}

/**
 * Get an article by its slug.
 * @param {string} slug - The slug of the article to retrieve.
 * @returns {object} The article.
 * @throws {Error} If the article is not found.
 */
async function getArticleBySlug(slug) {
    const article = await articleRepository.findBySlug(slug);
    if (!article) {
        throw new Error("Article not found");
    }
    return article;
}
/**
 * Update an article by its ID.
 * @param {string} id - The ID of the article to update.
 * @param {object} data - The updated article data.
 * @returns {object} The updated article.
 * @throws {Error} If the article is not found or required fields are missing.
 */
async function updateArticle(id, data) {
    if (!data.title) {
        throw new Error("Title is required");
    }

    if (!data.content) {
        throw new Error("Content is required");
    }
    const article = {
        title: data.title,
        slug: generateSlug(data.title),
        summary: data.summary || null,
        content: data.content,
        coverImage: data.coverImage || null,
        published: data.published ?? false
    }

    const articleArticle = await articleRepository.update(id, article);
    if (!articleArticle) { 
        throw new Error("Article not found");
    }
    return articleArticle;
}

async function deleteArticle(id) {
    const deletedArticle = await articleRepository.remove(id);

    if (!deleteArticle) {
        throw new Error("Article not found");
    }
    return deletedArticle;
}

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    updateArticle,
    deleteArticle
};