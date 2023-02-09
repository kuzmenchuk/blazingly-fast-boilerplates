import { UserCommunicationService } from "../../../services/user-communication.service";
import { TemplatesService } from "../../../services/templates.service";
import { TPipeFn } from "../create-boilerplate.types";

const templatesInstance = TemplatesService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

export const getTemplateName: TPipeFn = async (args) => {
  const templateNames = templatesInstance.getAllTemplateNames();

  if (templateNames.length > 1) {
    const answer = await userCommunicationInstance.askOptions(templateNames, {
      title: "Please, choose the template.",
    });

    args.data.templateName = answer;
  } else {
    args.data.templateName = templateNames[0];
  }

  return args;
};
