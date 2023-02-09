import { PathService } from "./path.service";
import { FsService } from "./fs.service";

const pathInstance = PathService.getInstance();
const fsInstance = FsService.getInstance();

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

    fsInstance.createIfNotExists(pathInstance.dotBfb(), "dir");
    fsInstance.createIfNotExists(pathInstance.templates(), "dir");

    return this.instance;
  }

  public config(name: string) {
    const json = fsInstance.readFile(pathInstance.templateConfig(name));
    return JSON.parse(json) as ITemplateConfig;
  }

  public getAllTemplateNames() {
    return fsInstance.readDir(pathInstance.templates());
  }

  public getTemplateFiles(name: string) {
    return fsInstance
      .readDir(pathInstance.templates(name))
      .filter((fileName) => fileName !== pathInstance.CONFIG_FILE_NAME);
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
    fsInstance.createDir(pathInstance.templates(name));
    fsInstance.createFile(
      pathInstance.templateConfig(name),
      JSON.stringify(config)
    );
    fileNames.forEach((fileName) =>
      fsInstance.createFile(pathInstance.templates(name, fileName))
    );
  }
}
