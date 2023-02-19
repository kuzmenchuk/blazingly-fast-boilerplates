import { copy } from "../../../copy/index";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getIsFolder: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(
    [copy.yes, copy.no],
    {
      title: copy.shouldBoilerplateCreateInFolder,
    }
  );

  arg.data.config.isFolder = answer === copy.yes;

  const { variablesToAsk, isFolder } = arg.data.config;
  if (isFolder) {
    arg.data.config.folderNameVariable =
      await userCommunicationInstance.askOptions(variablesToAsk, {
        title: copy.chooseVarForBoilerplateFolderName,
      });
  }

  return arg;
};
