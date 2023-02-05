import { PathService } from "./path.service";
import { FsService } from "./fs.service";
import { assert } from "../utils/index";

const path = PathService.getInstance();
const fs = FsService.getInstance();

export interface IConfig {
  globalVariables: IVariable[];
}

export interface IVariable {
  name: string;
  description?: string;
}

const emptyConfig: IConfig = {
  globalVariables: [],
};

export class ConfigService {
  private static instance: ConfigService;

  private constructor() {}

  public static getInstance(): ConfigService {
    if (!this.instance) {
      this.instance = new ConfigService();
    }

    fs.createIfNotExists(path.dotBfb(), "dir");
    fs.createIfNotExists(path.config(), "file", JSON.stringify(emptyConfig));

    return this.instance;
  }

  public addVariables(variables: IVariable[]) {
    const config = this.config();
    config.globalVariables.push(...variables);
    fs.writeFile(path.config(), JSON.stringify(config));
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
    const json = fs.readFile(path.config());
    return JSON.parse(json) as IConfig;
  }
}
