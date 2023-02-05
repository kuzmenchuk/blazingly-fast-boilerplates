import { UserCommunicationService } from "../../../services/user-communication.service";
import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const templates = TemplatesService.getInstance();
const userCommunication = UserCommunicationService.getInstance();

export const getTemplateName: TPipeFn = async (args) => {
  const templateNames = templates.getAllTemplateNames();

  if (templateNames.length > 1) {
    const answer = await userCommunication.askOptions(templateNames, {
      title: "Please, choose the template.",
    });

    args.data.templateName = answer;
  } else {
    args.data.templateName = templateNames[0];
  }

  return args;
};
