import { PathService } from "./path.service";
import { FsService } from "./fs.service";
import { ITemplateConfig } from "../types/index";

const pathInstance = PathService.getInstance();
const fsInstance = FsService.getInstance();

export class TemplatesService {
  private static instance: TemplatesService;

  private constructor() {}

  public static getInstance(): TemplatesService {
    fsInstance.createIfNotExists(pathInstance.dotBfb(), "dir");
    fsInstance.createIfNotExists(pathInstance.templates(), "dir");

    if (!this.instance) {
      this.instance = new TemplatesService();
    }

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
    fileNames.forEach((fileName, i) => {
      fsInstance.createFile(
        pathInstance.templates(name, fileName),
        i === 0
          ? "Please, complete the template files. Use variables you created.\nDon't forget to remove these lines :)"
          : undefined
      );
    });

    fsInstance.openFile(pathInstance.templates(name, fileNames[0]));
  }
}
