import { pipe } from "../../utils";
import { IPipeFnOptions } from "./create-boilerplate.types";
import {
  getTemplateConfig,
  appendStringToGlobalIndex,
  createBoilerplateFiles,
  askTemplateName,
  askValuesForVariables,
  createFolderIfNeeded,
  openFileAfterBoilerplateCreated,
  askAddTemplateIfNoneExists,
  replaceRelativePathWithAbsolute,
} from "./utils";

const boilerplatePipe = pipe(
  askAddTemplateIfNoneExists,
  askTemplateName,
  askValuesForVariables,
  getTemplateConfig,
  replaceRelativePathWithAbsolute,
  createFolderIfNeeded,
  createBoilerplateFiles,
  appendStringToGlobalIndex,
  openFileAfterBoilerplateCreated
);

export const createBoilerplate = async () => {
  try {
    const boilerplateData: IPipeFnOptions = {
      data: {
        templateName: "",
        variableValues: {},
      },
      templateConfig: undefined,
    };

    await boilerplatePipe(boilerplateData);
  } catch (error) {
    console.log(error);
  }
};
