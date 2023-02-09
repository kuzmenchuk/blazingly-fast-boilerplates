import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const pathInstance = PathService.getInstance();

const CORRECT_FOLDER_MSSG = "Yeah, that's correct!";
const WRONG_COLDER_MSSG = "Nope, let me choose one more time";

export const getPath: TPipeFn = async (arg) => {
  await userCommunicationInstance.askOptions(["OK"], {
    title:
      "Next, select the folder where entities (from boilerplate) will be created",
  });

  arg.data.config.path = await askChooseFolder();

  return arg;
};

const askChooseFolder = async (): Promise<string> => {
  const file = await userCommunicationInstance.askChooseFile({
    canSelectMany: false,
    title: "Please, select the folder where entity should be created",
    openLabel: "Select",
    canSelectFiles: false,
    canSelectFolders: true,
  });

  const relativePath = pathInstance.createRelative(file.path);

  const OK =
    (await userCommunicationInstance.askOptions(
      [CORRECT_FOLDER_MSSG, WRONG_COLDER_MSSG],
      {
        title: "Is the folder correct?".concat(" Path: " + relativePath),
      }
    )) === CORRECT_FOLDER_MSSG;

  if (OK) {
    return relativePath;
  }

  return askChooseFolder();
};
