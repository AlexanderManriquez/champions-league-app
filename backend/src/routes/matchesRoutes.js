import { Router } from "express";
import { updateMatchScore } from "../controllers/matchController.js";


const router = Router();

router.get('/matches/:id', updateMatchScore);

export default router;