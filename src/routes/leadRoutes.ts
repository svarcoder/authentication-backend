import { Router } from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  getLeadById,
} from "../controllers/leadController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createLead);
router.get("/get", authMiddleware, getLeads);
router.get("/getSingle/:id", authMiddleware, getLeadById);
router.put("/update/:id", authMiddleware, updateLead);
router.delete("/delete/:id", authMiddleware, deleteLead);

export default router;
