import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getIsFolder: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askOptions(["Yes", "No"], {
    title: "Should boilerplates be created in a folder?",
  });

  arg.data.config.isFolder = answer === "Yes";

  return arg;
};
