import { copy } from "../../copy/index";
import { FsService } from "../../services/fs.service";
import { PathService } from "../../services/path.service";
import { TemplatesService } from "../../services/templates.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { getStringPositionInFile, pipe, replaceWithValues } from "../../utils";
import { addNewTemplate } from "../add-new-template/add-new-template";
import { IPipeFnOptions } from "./create-boilerplate.types";
import { getTemplateName, getVariableValues } from "./utils";

const templatesInstance = TemplatesService.getInstance();
const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

const boilerplatePipe = pipe(getTemplateName, getVariableValues);

export const createBoilerplate = async () => {
  try {
    const boilerplateData: IPipeFnOptions = {
      data: {
        templateName: "",
        variableValues: {},
      },
    };

    const templateNames = templatesInstance.getAllTemplateNames();

    if (templateNames.length === 0) {
      await userCommunicationInstance.askApprove({
        title: copy.youDontHaveAnyTemplatesAddOne,
      });
      await addNewTemplate();
      // return because user should add boilerplate to the template files first.
      return;
    }

    await boilerplatePipe(boilerplateData);

    const templateConfig = templatesInstance.config(
      boilerplateData.data.templateName
    );

    if (templateConfig.isFolder) {
      templateConfig.path = pathInstance.createAbsolute(
        [
          templateConfig.path,
          // TOFIX!
          Object.values(boilerplateData.data.variableValues)[0],
        ].join("/")
      );
    } else {
      templateConfig.path = pathInstance.createAbsolute(templateConfig.path);
    }

    fsInstance.createDir(templateConfig.path);

    const templateAllFileNames = templatesInstance.getTemplateFiles(
      boilerplateData.data.templateName
    );

    const adjustVariables = (data: string) =>
      replaceWithValues(data, boilerplateData.data.variableValues);

    const filesToCreate = templateAllFileNames.map((fileName) => {
      const filePath = pathInstance.templates(
        boilerplateData.data.templateName,
        fileName
      );
      const fileData = fsInstance.readFile(filePath);
      const fileDataReplaced = adjustVariables(fileData);
      const fileNameReplaced = adjustVariables(fileName);
      return [fileNameReplaced, fileDataReplaced];
    });

    filesToCreate.forEach(([name, data]) => {
      fsInstance.createFile(templateConfig.path.concat("/" + name), data);
    });

    if (templateConfig.rootIndex) {
      const rootIndexPath = pathInstance.createAbsolute(
        templateConfig.rootIndex.path
      );
      fsInstance.appendFile(
        rootIndexPath,
        adjustVariables(templateConfig.rootIndex.pattern).replace(/\\n/g, "\n")
      );
    }

    if (templateConfig.fileToOpenAfterBoilerplateCreated) {
      const fileNameToOpen = adjustVariables(
        templateConfig.fileToOpenAfterBoilerplateCreated
      );

      const fileToOpen = filesToCreate.find(
        ([name]) => name === fileNameToOpen
      );

      if (fileToOpen) {
        await fsInstance.openFile(
          templateConfig.path.concat("/" + fileNameToOpen),
          { cursorPosition: getStringPositionInFile(fileToOpen[1], "$1") }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
