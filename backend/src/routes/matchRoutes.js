import { Router } from "express";
import { getFixturesByTeam } from "../controllers/matchController.js";

const router = Router();

router.get('/:teamId', getFixturesByTeam);

export default router;

