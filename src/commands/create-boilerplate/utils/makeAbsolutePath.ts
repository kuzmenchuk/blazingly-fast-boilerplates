import { FsService } from "../../../services/fs.service";
import { PathService } from "../../../services/path.service";
import { TPipeFn } from "../create-boilerplate.types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

export const makeAbsolutePath: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;
  if (!templateConfig) {
    throw new Error("template config should exist");
  }

  if (templateConfig.isFolder) {
    templateConfig.path = pathInstance.createAbsolute(
      [
        templateConfig.path,
        // TOFIX!
        Object.values(data.variableValues)[0],
      ].join("/")
    );

    fsInstance.createDir(templateConfig.path);
  } else {
    templateConfig.path = pathInstance.createAbsolute(templateConfig.path);
  }

  return { templateConfig, data };
};
