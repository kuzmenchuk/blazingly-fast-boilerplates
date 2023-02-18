import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunicationInstance = UserCommunicationService.getInstance();

export const getFileNames: TPipeFn = async (arg) => {
  const answer = await userCommunicationInstance.askInput({
    title: "Provide filenames with `,` as separator",
    placeHolder: "$$NAME.component.tsx,$$NAME.modules.scss,index.ts",
  });

  arg.data.fileNames = answer.split(",").map((str) => str.trim());

  return arg;
};
