import {
  ITemplateConfig,
  TemplatesService,
} from "../../services/templates.service";
import { ConfigService } from "../../services/config.service";
import { pipe } from "../../utils/index";
import { addVariables } from "../index";
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

const templates = TemplatesService.getInstance();
const globalConfig = ConfigService.getInstance();
const userCommunication = UserCommunicationService.getInstance();

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

  let variables = globalConfig.getAllVariables();

  if (variables.length === 0) {
    await userCommunication.askOptions(["OK"], {
      title:
        "You don't have any variables. Add at least one to be able to use boilerplates.",
    });
    variables = await addVariables();
  }

  const addTemplateData = await newTemplatePipe({
    data: { name: "", config: emptyConfig, fileNames: [] },
    helperData: { variables },
  });

  templates.addTemplate(addTemplateData.data);

  userCommunication.showMessage({
    type: "info",
    message: "Template was successfully added!",
  });
};
