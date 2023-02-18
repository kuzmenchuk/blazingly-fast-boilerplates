export interface ITemplateConfig {
  variablesToAsk: string[];
  isFolder: boolean;
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
  description?: string;
}
