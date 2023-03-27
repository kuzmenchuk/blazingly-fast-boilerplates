import { TemplatesService } from "../../services/templates.service";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { pipe } from "../../utils/index";
import { ITemplateConfig, IVariable } from "../../types/index";
import { copy } from "../../copy/index";
import { addVariables } from "../add-variables/add-variables";
import {
  askIsFolder,
  askTemplateName,
  askVariablesToAsk,
  askPath,
  askFileNames,
  askFileToOpenAfter,
  askRootIndex,
} from "./utils/index";
import { IPipeFnOptions } from "./add-new-template.types";

const newTemplatePipe = pipe(
  askTemplateName,
  askVariablesToAsk,
  askPath,
  askIsFolder,
  askFileNames,
  askFileToOpenAfter,
  askRootIndex
);

export const addNewTemplate = async () => {
  const templatesInstance = TemplatesService.getInstance();

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
  const globalConfigInstance = ConfigService.getInstance();
  const userCommunicationInstance = UserCommunicationService.getInstance();

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
  const userCommunicationInstance = UserCommunicationService.getInstance();
  userCommunicationInstance.showMessage({
    type: "info",
    message: copy.templateWasAdded,
  });
};
