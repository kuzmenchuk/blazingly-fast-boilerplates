import { PathService } from "../../../services/path.service";
import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();
const pathInstance = PathService.getInstance();

export const getRootIndex: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(["Yes", "No"], {
    title:
      "Do you want to append string to a file out of boilerplate's scope? Like, global index.ts",
  });

  if (answer === "No") {
    return arg;
  }

  await userCommunicationInstance.askApprove({
    title: "Next, select the file to which you wanna add a line",
  });

  const file = await userCommunicationInstance.askChooseFile({
    canSelectMany: false,
    title: "Please, select the file",
    openLabel: "Select",
    canSelectFiles: true,
    canSelectFolders: false,
  });

  const relativePath = pathInstance.createRelative(file.path);

  const pattern = await userCommunicationInstance.askInput({
    title: "Please, provide the pattern",
    placeHolder: `\\nexport { default as $$NAME } from "./$$NAME";`,
    prompt: "You can use variables and `\\n` for a new line",
  });

  arg.data.config.rootIndex = {
    path: relativePath,
    pattern,
  };

  return arg;
};
