import { FsService } from "../services/fs.service";
import { PathService } from "../services/path.service";
import { IConfig } from "../types";

const fsInstance = FsService.getInstance();
const pathInstance = PathService.getInstance();

const emptyConfig: IConfig = {
  globalVariables: [],
};

export const init = () => {
  fsInstance.createIfNotExists(pathInstance.dotBfb(), "dir");

  fsInstance.createIfNotExists(
    pathInstance.config(),
    "file",
    JSON.stringify(emptyConfig)
  );
};
