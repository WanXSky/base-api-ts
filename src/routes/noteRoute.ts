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
 *        description: Success
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
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
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Note Found
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
 *        description: Success
 *      404:
 *        description: Not Found
 */
router.get('/:username/:slug', optionalAuth, readNote);

/**
 * @swagger
 * /api/notes/{slug}:
 *  put:
 *    tags:
 *      - Notes
 *    security:
 *      - bearerAuth: []
 *    summary: Update notes by slug
 *    description: mengubah notes berdasarkan slug dari usern
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema: 
 *          type: string
 *          example: hello-world
 *        required: true
 *        description: slug unik per masing-masing pengguna
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
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404: 
 *        description: Not Found
 */
router.put('/:slug', authenticate, validate(updateSchema), updateNote);

/**
 * @swagger
 * /api/notes/{slug}:
 *  delete:
 *    tags:
 *      - Notes
 *    security:
 *      - bearerAuth: []
 *    summary: Delete Note by slug
 *    description: Delete Note by slug ( Login Required )
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          type: string
 *          example: hello-world
 *        required: true
 *        description: slug unik per masing-masing pengguna
 *    responses:
 *      200:
 *        description: Note berhasil dihapus
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not found
 */
router.delete('/:slug', authenticate, deleteNote);

export default router;