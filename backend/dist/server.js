"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.use(router_1.router);
mongoose_1.default.connect('mongodb://host.docker.internal:27017/recipe')
    .then(_res => console.log('connected to mongo'))
    .catch(e => `Error: ${e}`);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
