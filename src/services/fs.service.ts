import * as fs from "fs";
import * as vscode from "vscode";

export class FsService {
  private static instance: FsService;

  private constructor() {}

  public static getInstance(): FsService {
    if (!this.instance) {
      this.instance = new FsService();
    }

    return this.instance;
  }

  public createIfNotExists(path: string, type: "file" | "dir", fileData = "") {
    if (this.exists(path)) {
      return;
    }
    if (type === "file") {
      this.createFile(path, fileData);
    }
    if (type === "dir") {
      this.createDir(path);
    }
  }

  public exists(path: string) {
    return fs.existsSync(path);
  }

  public createDir(path: string) {
    return fs.mkdirSync(path);
  }

  public readDir(path: string) {
    return fs.readdirSync(path);
  }

  public createFile(path: string, data: string | Uint8Array = "") {
    return fs.appendFileSync(path, data);
  }

  public appendFile = this.createFile;

  public readFile(path: string) {
    return fs.readFileSync(path, "utf-8");
  }

  public writeFile(path: string, data: string) {
    return fs.writeFileSync(path, data);
  }

  public async openFile(path: string) {
    const pathUri = vscode.Uri.file(path);
    const textDocShowed = await vscode.window.showTextDocument(pathUri);
    return textDocShowed;
  }
}
