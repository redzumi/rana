import { ForgeServer } from '@rana-mc/forge';
import { FabricServer } from '@rana-mc/fabric';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

enum ServerCoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}

export default class InstallAPI extends APIRoute {

  ranaDB: RanaDB;

  get TAG() {
    return "RanaAPI-install";
  }

  constructor() {
    super();

    this.ranaDB = ranaDB;
    this.init();
  }

  init = async () => {
    this.useInstall();
  }

  useInstall() {
    this.router.post('/install/:id', async (req, res) => {
      const serverId = req.params.id;
      const server = await ranaDB.findServer(serverId);

      this.log(`Installing server with id = ${serverId}`);

      if (server.core.type === ServerCoreType.Forge) {
        new ForgeServer(server).installCore();
      }

      if (server.core.type === ServerCoreType.Fabric) {
        new FabricServer(server).installCore();
      }

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }
}