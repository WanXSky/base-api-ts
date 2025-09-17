import { Router } from "express";
import { createNote, readAllNote, readNote, updateNote, deleteNote } from "../controllers/noteController";
import { authenticate, optionalAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createSchema, updateSchema } from "../schemas/noteSchema";

const router = Router();

/**
 * @swagger
 * /api/notes/create:
 *  post:
 *    tags:
 *      - Notes
 *    security:
 *      - bearerAuth: []
 *    summary: Create new Notes
 *    description: Create a new Notes with Token
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            required: 
 *              - title
 *              - content
 *              - isPublic
 *            properties:
 *              title:
 *                type: string
 *                example: Hello World
 *              content:
 *                type: string
 *                example: Hello from Type Script
 *              isPublic:
 *                type: boolean
 *                example: true
 *    responses:
 *      201:
 *        description: Note created successfully
 *      400:
 *        description: invalid input
 *      401:
 *        description: Invalid token or Token expaired
 */
router.post('/create', authenticate, validate(createSchema), createNote);

/**
 * @swagger
 * /api/notes/{username}:
 *  get:
 *    tags:
 *      - Notes
 *    security:
 *      - bearerAuth: []
 *    summary: Get All Notes By Username
 *    description: Dapatkan semua notes berdasarkan username jika tidak login maka yang hanya yang public saja
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *          example: onokosy
 *        required: true
 *        description: Username unik dari pengguna
 *    responses:
 *      200:
 *        description: Semua catatan public diambil
 *      401:
 *        description: Unauthorized token tidak valid atau kadaluarsa
 *      404:
 *        description: Username tidak ditemukan
 * 
 */
router.get('/:username', optionalAuth, readAllNote);

/**
 * @swagger
 * /api/notes/{username}/{slug}:
 *  get:
 *    tags:
 *      - Notes
 *    security:
 *      - bearerAuth: []
 *    summary: Get Notes By Username and slug
 *    description: Mendapatkan notes berdasarkan Username dan juga slug
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *          example: onokosy
 *        required: true
 *        description: Username unik dari pengguna
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *          example: hello-world
 *        required: true
 *        description: Slug unik dari note
 *    responses:
 *      200:
 *        description: Berhasil Mendapatkan notes
 *      404:
 *        description: Note tidak ditemukan
 */
router.get('/:username/:slug', optionalAuth, readNote);
router.put('/:slug', authenticate, validate(updateSchema), updateNote);
router.delete('/:slug', authenticate, deleteNote);

export default router;