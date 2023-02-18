import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getFileToOpenAfter: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(
    arg.data.fileNames,
    {
      title: copy.chooseFileWhichWillBeOpened,
    }
  );

  arg.data.config.fileToOpenAfterBoilerplateCreated = answer;

  return arg;
};
