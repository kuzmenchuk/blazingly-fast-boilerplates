import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const pathInstance = PathService.getInstance();

export const getRootIndex: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(["Yes", "No"], {
    title:
      "Do you want to add a line to a file out of boilerplate? Like, index.ts",
  });

  if (answer === "No") {
    return arg;
  }

  await userCommunicationInstance.askOptions(["OK"], {
    title: "Next, select the file where a line will be added",
  });

  const file = await userCommunicationInstance.askChooseFile({
    canSelectMany: false,
    title: "Please, select the file where a line will be added",
    openLabel: "Select",
    canSelectFiles: true,
    canSelectFolders: false,
  });

  const relativePath = pathInstance.createRelative(file.path);

  const pattern = await userCommunicationInstance.askInput({
    title: "Please, provide the pattern",
    placeHolder: `export { default as $$NAME } from "./$$NAME";`,
  });

  arg.data.config.rootIndex = {
    path: relativePath,
    pattern,
  };

  return arg;
};
