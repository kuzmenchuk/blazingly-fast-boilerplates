/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import * as nodePath from "path";
import { assert, truthy } from "../utils/index";

export class PathService {
  private static instance: PathService;

  private constructor() {}

  public static getInstance(): PathService {
    if (!this.instance) {
      this.instance = new PathService();
    }

    return this.instance;
  }

  public readonly CONFIG_ROOT_FOLDER = ".bfb";
  public readonly TEMPLATES_FOLDER = "templates";
  public readonly CONFIG_FILE_NAME = ".bfb-config.json";

  public workspaceUri() {
    const [workspace] = vscode.workspace.workspaceFolders ?? [];
    return assert(workspace?.uri);
  }

  public createAbsolute(path: string) {
    return nodePath.join(this.workspaceUri().path, path);
  }

  public createRelative(absolutePath: string) {
    const { path } = this.workspaceUri();
    return absolutePath.replace(path, "");
  }

  public dotBfb() {
    const { path: workspacePath } = this.workspaceUri();
    return nodePath.join(workspacePath, this.CONFIG_ROOT_FOLDER);
  }

  public templateConfig(name: string) {
    return this.templates(name, this.CONFIG_FILE_NAME);
  }

  public templates(name?: string, fileName?: string) {
    const { path: workspacePath } = this.workspaceUri();
    return nodePath.join(
      ...[
        workspacePath,
        this.CONFIG_ROOT_FOLDER,
        this.TEMPLATES_FOLDER,
        name,
        fileName,
      ].filter(truthy)
    );
  }

  public config() {
    const { path: workspacePath } = this.workspaceUri();
    return nodePath.join(
      workspacePath,
      this.CONFIG_ROOT_FOLDER,
      this.CONFIG_FILE_NAME
    );
  }
}
