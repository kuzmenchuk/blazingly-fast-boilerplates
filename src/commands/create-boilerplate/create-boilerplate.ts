import { FsService } from "../../services/fs.service";
import { PathService } from "../../services/path.service";
import { TemplatesService } from "../../services/templates.service";
import { pipe, replaceWithValues } from "../../utils";
import { IPipeFnOptions } from "./create-boilerplate.types";
import { getTemplateName, getVariableValues } from "./utils";

const templates = TemplatesService.getInstance();
const fs = FsService.getInstance();
const path = PathService.getInstance();

const boilerplatePipe = pipe(getTemplateName, getVariableValues);

export const createBoilerplate = async () => {
  const boilerplateData: IPipeFnOptions = {
    data: {
      templateName: "",
      variableValues: {},
    },
  };

  await boilerplatePipe(boilerplateData);

  const templateConfig = templates.config(boilerplateData.data.templateName);

  if (templateConfig.isFolder) {
    templateConfig.path = path.createAbsolute(
      [
        templateConfig.path,
        // TOFIX!
        Object.values(boilerplateData.data.variableValues)[0],
      ].join("/")
    );
  } else {
    templateConfig.path = path.createAbsolute(templateConfig.path);
  }

  fs.createDir(templateConfig.path);

  const templateAllFileNames = templates.getTemplateFiles(
    boilerplateData.data.templateName
  );

  const adjustVariables = (data: string) =>
    replaceWithValues(data, boilerplateData.data.variableValues);

  const filesToCreate = templateAllFileNames.map((fileName) => {
    const filePath = path.templates(
      boilerplateData.data.templateName,
      fileName
    );
    const fileData = fs.readFile(filePath);
    const fileDataReplaced = adjustVariables(fileData);
    const fileNameReplaced = adjustVariables(fileName);
    return [fileNameReplaced, fileDataReplaced];
  });

  filesToCreate.forEach(([name, data]) => {
    fs.createFile(templateConfig.path.concat("/" + name), data);
  });

  if (templateConfig.rootIndex) {
    const rootIndexPath = path.createAbsolute(templateConfig.rootIndex.path);
    fs.appendFile(
      rootIndexPath,
      adjustVariables(templateConfig.rootIndex.pattern).concat("\n")
    );
  }
};
