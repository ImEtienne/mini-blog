"use strict";
const articleService = require("../services/article.service");

async function createArticle(req, res) {
    try {
        const article = await articleService.createArticle(req.body);
        return res.status(201).json(article);
    
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

async function getArticles(req, res) {
    try {
        const articles = await articleService.getArticles();
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
} 
 
async function getArticleBySlug(req, res) {
    try {
        const article = await articleService.getArticleBySlug(req.params.slug);
        return res.status(200).json(article);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

async function updateArticle(req, res) { 
    try {
        const article = await articleService.updateArticle(req.params.id, req.body);
        return res.status(200).json(article);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

async function deleteArticle(req, res) {
    try {
        const article = await articleService.deleteArticle(req.params.id);
        return res.status(200).json(article);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    createArticle,
    getArticles,
    getArticleBySlug,
    updateArticle,
    deleteArticle
};