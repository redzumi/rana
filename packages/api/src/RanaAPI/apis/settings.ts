import APIRoute from '../APIRoute';

export default class SettingsAPI extends APIRoute {

  get TAG() {
    return "RanaAPI-settings";
  }

  // export const getSettingsAPI = () => {
  //   const router = Router();

  //   router.get('/settings', async (req, res) => {
  //     const settings = await db.getSettings();
  //     res.send(settings);
  //   });

  //   router.post('/settings', async (req, res) => {
  //     const body: Partial<Settings> = req.body;

  //     try {
  //       await db.setSettings(body);
  //       const settings = await db.getSettings();

  //       res.send(settings);
  //     } catch (err) {
  //       log(err.message);
  //       res.sendStatus(500);
  //     }
  //   });

  //   return router;
  // };
}