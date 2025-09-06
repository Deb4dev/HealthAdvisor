import { generate } from "../controllers/generate.controller.js";

import { Router } from "express";

const router = Router();

router.post("/generate", generate);

export default router;