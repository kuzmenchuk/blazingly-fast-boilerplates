import { TemplatesService } from "../../services/templates.service";
import { ConfigService } from "../../services/config.service";
import { UserCommunicationService } from "../../services/user-communication.service";
import { pipe } from "../../utils/index";
import { ITemplateConfig } from "../../types/index";
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

const newTemplatePipe = pipe<IPipeFnOptions>(
  getTemplateName,
  getVariablesToAsk,
  getPath,
  getIsFolder,
  getFileNames,
  getFileToOpenAfter,
  getRootIndex
);

export const addNewTemplate = async () => {
  const emptyConfig: ITemplateConfig = {
    variablesToAsk: [],
    isFolder: false,
    path: "",
    fileToOpenAfterBoilerplateCreated: undefined,
    rootIndex: undefined,
  };

  let variables = globalConfigInstance.getAllVariables();

  if (variables.length === 0) {
    await userCommunicationInstance.askApprove({
      title: copy.noVariablesAddOne,
    });
    variables = await addVariables();
  }

  const { data } = await newTemplatePipe({
    data: { name: "", config: emptyConfig, fileNames: [] },
    helperData: { variables },
  });

  templatesInstance.addTemplate(data);

  userCommunicationInstance.showMessage({
    type: "info",
    message: copy.templateWasAdded,
  });
};
