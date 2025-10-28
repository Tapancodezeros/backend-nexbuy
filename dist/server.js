"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json()); // For parsing JSON request bodies
app.use('/users', userRoutes_1.default); // Mount user routes
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
