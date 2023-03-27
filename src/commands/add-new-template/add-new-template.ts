import { TemplatesService } from "../../services/templates.service";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { pipe } from "../../utils/index";
import { ITemplateConfig, IVariable } from "../../types/index";
import { copy } from "../../copy/index";
import { addVariables } from "../add-variables/add-variables";
import {
  getIsFolder,
  getTemplateName,
  getVariablesToAsk,
  getPath,
  getFileNames,
  getFileToOpenAfter,
  getRootIndex,
} from "./utils/index";
import { IPipeFnOptions } from "./add-new-template.types";

const templatesInstance = TemplatesService.getInstance();
const globalConfigInstance = ConfigService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

const newTemplatePipe = pipe(
  getTemplateName,
  getVariablesToAsk,
  getPath,
  getIsFolder,
  getFileNames,
  getFileToOpenAfter,
  getRootIndex
);

export const addNewTemplate = async () => {
  try {
    const arg = await createArg();
    const { data } = await newTemplatePipe(arg);

    templatesInstance.addTemplate(data);
    showSuccessMessage();
  } catch (error) {
    console.log(error);
  }
};

const createArg = async (): Promise<IPipeFnOptions> => {
  const emptyConfig: ITemplateConfig = {
    variablesToAsk: [],
    isFolder: false,
    path: "",
    fileToOpenAfterBoilerplateCreated: undefined,
    rootIndex: undefined,
  };

  const arg = {
    data: { name: "", config: emptyConfig, fileNames: [] },
    helperData: { variables: await getVariables() },
  };

  return arg;
};

const getVariables = async (): Promise<IVariable[]> => {
  let variables = globalConfigInstance.getAllVariables();

  if (variables.length === 0) {
    await userCommunicationInstance.askApprove({
      title: copy.noVariablesAddOne,
    });
    variables = await addVariables();
  }

  return variables;
};

const showSuccessMessage = () => {
  userCommunicationInstance.showMessage({
    type: "info",
    message: copy.templateWasAdded,
  });
};
