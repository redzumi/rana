import axios from 'axios';
import { fabricLocalDB } from './FabricLocalDB';

import { Logger } from './Logger';

export class FabricBuildUtils {
  public static TAG = 'FabricBuildUtils';

  public static logger: Logger = new Logger(FabricBuildUtils.TAG);

  private installersUrl: string = 'https://meta.fabricmc.net/v2/versions/installer';

  private loadersUrl: string = 'https://meta.fabricmc.net/v2/versions/loader';

  async getInstallers(refresh?: boolean) {
    const installersFromDB = fabricLocalDB.getFabricInstallers();
    if (!refresh && installersFromDB) return installersFromDB;

    try {
      const response = await axios.get(this.installersUrl);
      const installers: FabricInstaller[] = response.data;

      fabricLocalDB.setFabricInstallers(installers);
      return fabricLocalDB.getFabricInstallers();
    } catch (err) {
      FabricBuildUtils.logger.log(`Got error after getInstallers – ${err.message}`);
    }

    return null;
  }

  async getLoaders(refresh?: boolean) {
    const loadersFromDB = fabricLocalDB.getFabricLoaders();
    if (!refresh && loadersFromDB) return loadersFromDB;

    try {
      const response = await axios.get(this.loadersUrl);
      const loaders: FabricLoader[] = response.data;

      fabricLocalDB.setFabricLoaders(loaders);
      return fabricLocalDB.getFabricLoaders();
    } catch (err) {
      FabricBuildUtils.logger.log(`Got error after getLoaders – ${err.message}`);
    }

    return null;
  }

  async getCoreStatus(options: {
    game: string,
    loader: string,
    installer: string
  }, refresh?: boolean) {
    const { game, loader, installer } = options;
    const coreName = `${game}_${loader}_${installer}`;

    const statusFromDB = fabricLocalDB.getCoreStatus(coreName);
    if (!refresh && statusFromDB) return statusFromDB;

    try {
      const urlByVersion = `${this.loadersUrl}/`;
      const serverPath = `${options.game}/${loader}/${installer}/`;
      const serverUrl = `${urlByVersion}${serverPath}server/jar`;

      console.log(serverUrl);

      const response = await axios.get(serverUrl);
      const { status } = response;

      fabricLocalDB.setCoreStatus(coreName, status);
      return fabricLocalDB.getCoreStatus(coreName);
    } catch (err) {
      FabricBuildUtils.logger.log(`Got error after getCoreStatus – ${err.message}`);
    }

    return null;
  }
}