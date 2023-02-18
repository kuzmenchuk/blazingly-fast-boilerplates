import { FsService } from "../../../services/fs.service";
import { PathService } from "../../../services/path.service";
import { TemplatesService } from "../../../services/templates.service";
import { replaceWithValues } from "../../../utils";
import { TPipeFn } from "../create-boilerplate.types";

const templatesInstance = TemplatesService.getInstance();
const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

export const createBoilerplateFiles: TPipeFn = async (arg) => {
  const { data, templateConfig } = arg;

  if (!templateConfig) {
    throw new Error("Template config should exist");
  }

  const templateAllFileNames = templatesInstance.getTemplateFiles(
    data.templateName
  );

  const filesToCreate = templateAllFileNames.map((fileName) => {
    const filePath = pathInstance.templates(data.templateName, fileName);
    const fileData = fsInstance.readFile(filePath);

    const fileDataReplaced = replaceWithValues(fileData, data.variableValues);
    const fileNameReplaced = replaceWithValues(fileName, data.variableValues);

    return [fileNameReplaced, fileDataReplaced];
  });

  filesToCreate.forEach(([name, data]) => {
    fsInstance.createFile(templateConfig.path.concat("/" + name), data);
  });

  return { data, templateConfig };
};
