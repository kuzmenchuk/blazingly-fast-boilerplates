import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunication = UserCommunicationService.getInstance();
const path = PathService.getInstance();

export const getRootIndex: TPipeFn = async (arg) => {
  const answer = await userCommunication.askOptions(["Yes", "No"], {
    title:
      "Do you want to add a line to a file out of boilerplate? Like, index.ts",
  });

  if (answer === "No") {
    return arg;
  }

  await userCommunication.askOptions(["OK"], {
    title: "Next, select the file where a line will be added",
  });

  const file = await userCommunication.askChooseFile({
    canSelectMany: false,
    title: "Please, select the file where a line will be added",
    openLabel: "Select",
    canSelectFiles: true,
    canSelectFolders: false,
  });

  const relativePath = path.createRelative(file.path);

  const pattern = await userCommunication.askInput({
    title: "Please, provide the pattern",
    placeHolder: `export { default as $$NAME } from "./$$NAME";`,
  });

  arg.data.config.rootIndex = {
    path: relativePath,
    pattern,
  };

  return arg;
};
