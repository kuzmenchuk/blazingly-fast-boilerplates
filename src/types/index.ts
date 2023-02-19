export interface ITemplateConfig {
  variablesToAsk: string[];
  isFolder: boolean;
  folderNameVariable?: string;
  path: string;
  fileToOpenAfterBoilerplateCreated?: string;
  rootIndex?: {
    path: string;
    pattern: string;
  };
}

export interface IConfig {
  globalVariables: IVariable[];
}

export interface IVariable {
  name: string;
}
