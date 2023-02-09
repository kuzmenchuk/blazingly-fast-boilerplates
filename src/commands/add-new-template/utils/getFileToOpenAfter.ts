import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getFileToOpenAfter: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(
    arg.data.fileNames,
    {
      title:
        "Please, choose file which will be openned after boilerplate is created.",
    }
  );

  arg.data.config.fileToOpenAfterBoilerplateCreated = answer;

  return arg;
};
