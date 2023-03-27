import { PathService } from "../../../services/path.service";
import { TPipeFn } from "../create-boilerplate.types";

const pathInstance = PathService.getInstance();

export const replaceRelativePathWithAbsolute: TPipeFn = async (arg) => {
  const { templateConfig, data } = arg;
  if (!templateConfig) {
    throw new Error("template config should exist");
  }

  if (templateConfig.isFolder) {
    const getFolderName = () => {
      const firstVariableValue = Object.values(data.variableValues)[0];
      const folderNameVariable = templateConfig.folderNameVariable ?? "";
      const folderName =
        data.variableValues[folderNameVariable] ?? firstVariableValue;

      return folderName;
    };

    templateConfig.path = pathInstance.createAbsolute(
      [templateConfig.path, getFolderName()].join("/")
    );
  } else {
    templateConfig.path = pathInstance.createAbsolute(templateConfig.path);
  }

  return { templateConfig, data };
};
