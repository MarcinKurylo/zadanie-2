"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const schemas_1 = require("./schemas");
exports.router = (0, express_1.Router)();
exports.router.route('/recipe')
    .get((req, res) => {
    let filter = {};
    if (req.query.name) {
        filter = { name: { "$regex": req.query.name, "$options": "i" } };
    }
    schemas_1.RecipeModel.find(filter)
        .then((recipe) => res.status(200).json({ code: 200, action: 'GET', items: recipe }));
})
    .post((req, res) => {
    const recipe = new schemas_1.RecipeModel(req.body);
    schemas_1.RecipeModel.create(recipe)
        .then(recipe => res.status(200).json({ code: 200, action: 'POST', items: recipe }))
        .catch((e) => res.json(e));
});
exports.router.route('/recipe/:id')
    .get((req, res) => {
    schemas_1.RecipeModel.findById(req.params.id)
        .then(recipe => res.status(200).json({ code: 200, action: 'GET', items: recipe }));
})
    .delete((req, res) => {
    schemas_1.RecipeModel.findByIdAndDelete(req.params.id)
        .then(recipe => res.status(200).json({ code: 200, action: 'DELETE', items: recipe }))
        .catch((e) => res.json(e));
})
    .put((req, res) => {
    schemas_1.RecipeModel.findByIdAndUpdate(req.params.id, req.body)
        .then(recipe => res.status(200).json({ code: 200, action: 'PUT', items: recipe }))
        .catch((e) => res.json(e));
});
