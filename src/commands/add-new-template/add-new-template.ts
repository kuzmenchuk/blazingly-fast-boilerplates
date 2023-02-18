import {
  ITemplateConfig,
  TemplatesService,
} from "../../services/templates.service";
import { ConfigService } from "../../services/config.service";
import { pipe } from "../../utils/index";
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
import { UserCommunicationService } from "../../services/user-communication.service";

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
      title:
        "It seems like you don't have any variables added. Please, add one to continue.",
    });
    variables = await addVariables();
  }

  const addTemplateData = await newTemplatePipe({
    data: { name: "", config: emptyConfig, fileNames: [] },
    helperData: { variables },
  });

  templatesInstance.addTemplate(addTemplateData.data);

  userCommunicationInstance.showMessage({
    type: "info",
    message: "Template was successfully added!",
  });
};
