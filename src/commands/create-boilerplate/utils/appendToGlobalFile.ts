import { FsService } from "../../../services/fs.service";
import { PathService } from "../../../services/path.service";
import { replaceWithValues } from "../../../utils";
import { TPipeFn } from "../create-boilerplate.types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

export const appendToGlobalFile: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;

  if (!templateConfig) {
    throw new Error("Template config should exist");
  }

  if (templateConfig.rootIndex) {
    const rootIndexPath = pathInstance.createAbsolute(
      templateConfig.rootIndex.path
    );

    fsInstance.appendFile(
      rootIndexPath,
      replaceWithValues(
        templateConfig.rootIndex.pattern,
        data.variableValues
      ).replace(/\\n/g, "\n")
    );
  }

  return { templateConfig, data };
};
