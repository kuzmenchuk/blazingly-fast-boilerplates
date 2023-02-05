import { PathService } from "./path.service";
import { FsService } from "./fs.service";

const path = PathService.getInstance();
const fs = FsService.getInstance();

export interface ITemplateConfig {
  variablesToAsk: string[];
  isFolder: boolean;
  path: string;
  fileToOpenAfterBoilerplateCreated?: string;
  rootIndex?: {
    path: string;
    pattern: string;
  };
}

export class TemplatesService {
  private static instance: TemplatesService;

  private constructor() {}

  public static getInstance(): TemplatesService {
    if (!this.instance) {
      this.instance = new TemplatesService();
    }

    fs.createIfNotExists(path.dotBfb(), "dir");
    fs.createIfNotExists(path.templates(), "dir");

    return this.instance;
  }

  public config(name: string) {
    const json = fs.readFile(path.templateConfig(name));
    return JSON.parse(json) as ITemplateConfig;
  }

  public getAllTemplateNames() {
    return fs.readDir(path.templates());
  }

  public getTemplateFiles(name: string) {
    return fs
      .readDir(path.templates(name))
      .filter((fileName) => fileName !== path.CONFIG_FILE_NAME);
  }

  public addTemplate({
    name,
    config,
    fileNames,
  }: {
    name: string;
    config: ITemplateConfig;
    fileNames: string[];
  }) {
    fs.createDir(path.templates(name));
    fs.createFile(path.templateConfig(name), JSON.stringify(config));
    fileNames.forEach((fileName) =>
      fs.createFile(path.templates(name, fileName))
    );
  }
}
