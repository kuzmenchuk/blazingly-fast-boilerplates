import { copy } from "../../../copy/index";
import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const pathInstance = PathService.getInstance();

export const askPath: TPipeFn = async (arg) => {
  await userCommunicationInstance.askApprove({
    title: copy.selectFolderWhereCreateBoilerplates,
  });

  arg.data.config.path = await askChooseFolder();

  return arg;
};

const askChooseFolder = async (): Promise<string> => {
  const folder = await userCommunicationInstance.askChooseFile({
    canSelectMany: false,
    title: copy.selectFolderWhereCreateBoilerplates,
    openLabel: copy.select,
    canSelectFiles: false,
    canSelectFolders: true,
  });

  const relativePath = pathInstance.createRelative(folder.path);

  const OK =
    (await userCommunicationInstance.askOptions(
      [copy.correct, copy.wrongLetsTryAgain],
      {
        title: copy.isFolderCorrect.concat(" Path: " + relativePath),
      }
    )) === copy.correct;

  if (OK) {
    return relativePath;
  }

  return askChooseFolder();
};
