import { copy } from "../../../copy/index";
import { TemplatesService } from "../../../services/templates.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { addNewTemplate } from "../../add-new-template/add-new-template";
import { TPipeFn } from "../create-boilerplate.types";

const templatesInstance = TemplatesService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

export const askAddTemplateIfNoneExists: TPipeFn = async (args) => {
  const templateNames = templatesInstance.getAllTemplateNames();

  if (templateNames.length > 0) {
    return args;
  }

  await userCommunicationInstance.askApprove({
    title: copy.youDontHaveAnyTemplatesAddOne,
  });
  await addNewTemplate();

  throw new Error("User should add template first");
};
