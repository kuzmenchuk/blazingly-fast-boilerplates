import { pipe } from "../../utils";
import { IPipeFnOptions } from "./create-boilerplate.types";
import {
  appendTemplateConfig,
  appendToGlobalFile,
  createBoilerplateFiles,
  getTemplateName,
  getVariableValues,
  makeAbsolutePath,
  openFileAfterBoilerplateCreated,
  templateShouldExist,
} from "./utils";

const boilerplatePipe = pipe(
  templateShouldExist,
  getTemplateName,
  getVariableValues,
  appendTemplateConfig,
  makeAbsolutePath,
  createBoilerplateFiles,
  appendToGlobalFile,
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
