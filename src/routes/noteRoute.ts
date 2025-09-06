import { Router } from "express";
import { createNote, readAllNote, readNote, updateNote, deleteNote } from "../controllers/noteController";
import { authenticate, optionalAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createSchema, updateSchema } from "../schemas/noteSchema";

const router = Router();

router.post('/create', authenticate, validate(createSchema), createNote);
router.get('/:username', optionalAuth, readAllNote);
router.get('/:username/:slug', optionalAuth, readNote);
router.put('/:slug', authenticate, validate(updateSchema), updateNote);
router.delete('/:slug', authenticate, deleteNote);

export default router;