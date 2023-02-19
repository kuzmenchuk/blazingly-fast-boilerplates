import { FsService } from "../../../services/fs.service";
import { PathService } from "../../../services/path.service";
import { TPipeFn } from "../create-boilerplate.types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

export const createFolderIfNeeded: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;
  if (!templateConfig) {
    throw new Error("template config should exist");
  }

  if (templateConfig.isFolder) {
    // if isFolder === true, folderNameVariable should always exist
    const folderName = templateConfig.folderNameVariable
      ? data.variableValues[templateConfig.folderNameVariable] ??
        Object.values(data.variableValues)[0]
      : Object.values(data.variableValues)[0];

    templateConfig.path = pathInstance.createAbsolute(
      [templateConfig.path, folderName].join("/")
    );

    fsInstance.createDir(templateConfig.path);
  } else {
    templateConfig.path = pathInstance.createAbsolute(templateConfig.path);
  }

  return { templateConfig, data };
};
