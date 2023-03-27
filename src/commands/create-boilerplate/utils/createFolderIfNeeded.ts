import { FsService } from "../../../services/fs.service";
import { TPipeFn } from "../create-boilerplate.types";

const fsInstance = FsService.getInstance();

/**
 * Should be used with absolute path in `templateConfig.path`!
 */
export const createFolderIfNeeded: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;
  if (!templateConfig) {
    throw new Error("template config should exist");
  }

  if (templateConfig.isFolder) {
    fsInstance.createDir(templateConfig.path);
  }

  return { templateConfig, data };
};
