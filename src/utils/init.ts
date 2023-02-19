import { copy } from "../copy";
import { FsService } from "../services/fs.service";
import { PathService } from "../services/path.service";
import { UserCommunicationService } from "../services/user-communication.service";
import { IConfig } from "../types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();
const userCommunicationInstance = UserCommunicationService.getInstance();

const emptyConfig: IConfig = {
  globalVariables: [],
};

export const init = async () => {
  const wasCreated = fsInstance.createIfNotExists(pathInstance.dotBfb(), "dir");

  fsInstance.createIfNotExists(
    pathInstance.config(),
    "file",
    JSON.stringify(emptyConfig)
  );

  if (wasCreated) {
    const answer = await userCommunicationInstance.askOptions(
      [copy.yes, copy.no],
      {
        title: copy.addPrettierIgnore,
      }
    );

    if (answer === copy.yes) {
      const alreadyExist = !fsInstance.createIfNotExists(
        pathInstance.createAbsolute(".prettierignore"),
        "file",
        pathInstance.CONFIG_ROOT_FOLDER + "/*"
      );

      if (alreadyExist) {
        fsInstance.appendFile(
          pathInstance.createAbsolute(".prettierignore"),
          "\n" + pathInstance.CONFIG_ROOT_FOLDER + "/*\n"
        );
      }
    }
  }
};
