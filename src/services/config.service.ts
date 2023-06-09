import { PathService } from "./path.service";
import { FsService } from "./fs.service";
import { assert } from "../utils/index";
import { IConfig, IVariable } from "../types/index";

export class ConfigService {
  private static instance: ConfigService;

  private constructor() {}

  public static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService();
    }

    return this.instance;
  }

  public addVariables(variables: IVariable[]) {
    const pathInstance = PathService.getInstance();
    const fsInstance = FsService.getInstance();

    const config = this.config();
    config.globalVariables.push(...variables);
    fsInstance.writeFile(pathInstance.config(), JSON.stringify(config));
  }

  public getVariable(name: string) {
    return assert(
      this.getAllVariables().find((variable) => variable.name === name)
    );
  }

  public getAllVariables() {
    return this.config().globalVariables;
  }

  private config() {
    const pathInstance = PathService.getInstance();
    const fsInstance = FsService.getInstance();

    const json = fsInstance.readFile(pathInstance.config());
    return JSON.parse(json) as IConfig;
  }
}
