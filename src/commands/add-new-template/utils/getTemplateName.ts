import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getTemplateName: TPipeFn = async (arg) => {
  arg.data.name = await userCommunicationInstance.askInput({
    title: copy.provideNameOfTemplate,
  });

  return arg;
};
