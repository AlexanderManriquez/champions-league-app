import { Router } from "express";
import { getMatchEvents } from "../controllers/eventController.js";


const router = Router();

router.get('/:matchId/events', getMatchEvents);

export default router;