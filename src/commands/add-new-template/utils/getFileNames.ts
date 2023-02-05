import { UserCommunicationService } from "../../../services/user-communication.service";
import { TPipeFn } from "../add-new-template.types";

const userCommunication = UserCommunicationService.getInstance();

export const getFileNames: TPipeFn = async (arg) => {
  const answer = await userCommunication.askInput({
    title: "Provide filenames with `,` as separator",
    placeHolder: "$$NAME.component.tsx,$$NAME.modules.scss,index.ts",
  });

  arg.data.fileNames = answer.split(",");

  return arg;
};
