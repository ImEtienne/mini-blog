"use strict";

const express = require("express");
const articleController = require("../controllers/article.controller");
const router = express.Router();

router.get("/", articleController.getArticles);
router.get("/:slug", articleController.getArticleBySlug);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;