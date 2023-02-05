import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunication = UserCommunicationService.getInstance();

export const getTemplateName: TPipeFn = async (arg) => {
  arg.data.name = await userCommunication.askInput({
    title: "Please, provide the name of the new template.",
  });

  return arg;
};
