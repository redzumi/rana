import { Router } from 'express';
import { db } from '@rana-mc/db';
import { log } from "../utils/index.js";
export const getServersAPI = () => {
    const router = Router();
    router.get('/servers', async (req, res) => {
        const servers = await db.getServers();
        res.send(servers);
    });
    router.post('/servers', async (req, res) => {
        const body = req.body;
        try {
            await db.addServer(body);
            res.send({ success: true });
        }
        catch (err) {
            log(err.message);
            res.sendStatus(500);
        }
    });
    return router;
};