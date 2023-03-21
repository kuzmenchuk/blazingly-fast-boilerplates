/**
 * template config interface
 */
export interface ITemplateConfig {
  /**
   * array of variable names, that are used with the template
   */
  variablesToAsk: string[];
  /**
   * is boilerplate created in a folder or as a single file?
   */
  isFolder: boolean;
  /**
   * if it's created in a folder, than what variable is reponsible for the folder name?
   */
  folderNameVariable?: string;
  /**
   * path, where the boilerplate should be created
   */
  path: string;
  /**
   * which file should be opened after boilerplate is created
   */
  fileToOpenAfterBoilerplateCreated?: string;
  /**
   * if the template should append a string to a file out of a template scope,
   * then here's the object with all needed data;
   * it is created with `index.ts` files in mind
   */
  rootIndex?: {
    /**
     * the path to the file
     */
    path: string;
    /**
     * pattern that should be added to the file;
     * it uses the variable names & \n for a new line
     */
    pattern: string;
  };
}

/**
 * global config interface
 */
export interface IConfig {
  globalVariables: IVariable[];
}

export interface IVariable {
  name: string;
}
