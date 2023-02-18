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

  const adjustVariables = (str: string) =>
    replaceWithValues(str, data.variableValues);

  if (templateConfig.rootIndex) {
    const rootIndexPath = pathInstance.createAbsolute(
      templateConfig.rootIndex.path
    );

    fsInstance.appendFile(
      rootIndexPath,
      adjustVariables(templateConfig.rootIndex.pattern).replace(/\\n/g, "\n")
    );
  }

  return { templateConfig, data };
};
