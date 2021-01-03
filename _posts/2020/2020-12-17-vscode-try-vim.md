---
layout: article
title: vscode中如何实现类似vim模式
---

vscode对于我是一个新的开发环境，如果没有类似vim模式的操作，我就会陷入不能编程的可怕情绪里。
于是编写插件开始定制

先拦截输入
```
vscode.commands.registerCommand('type', e => {
		typeHandler(e.text);
});
```

文件打开的时候把光标改掉
```
vscode.window.onDidChangeActiveTextEditor((editor) => symbol.onDidChangeActiveTextEditor(editor))


export function setCursor(editor: vscode.TextEditor): void {
    if (globalState.mode == Mode.Insert) {
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Line;
    } else if (globalState.mode == Mode.Normal) {
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Block;
    } else {
        editor.options.cursorStyle = vscode.TextEditorCursorStyle.Underline;
    }
}

```

然后根据输入随意定制出对命令的组合

```

export function typeHandler(char: string): void {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	let res: string = "";

	if (char == 'i') {
		changeModel(Mode.Insert, editor, true);
		res = "OK";
	}

	if (char == 'V') {
		changeModel(Mode.MOVE, editor);
		res = "OK";
	}

	if (char == 'v') {
		changeModel(Mode.Select, editor);
		res = "OK";
	}

	if (keymapping[globalState.mode + char]) {
		vscode.commands.executeCommand(keymapping[globalState.mode + char]);
		res = "OK";
	}

	if (funmapping[globalState.mode + char]) {
		funmapping[globalState.mode + char]();
		res = "OK";
	}

}
```

命令映射

```
export let keymapping: { [index: string]: string } = {

    [Mode.Normal + '1']: "workbench.action.findInFiles",
    [Mode.Normal + '2']: "workbench.action.replaceInFiles",
    [Mode.Normal + "4"]: "editor.action.clipboardCutAction",
    [Mode.Normal + "5"]: "editor.action.copyLinesDownAction",
    [Mode.Normal + "6"]: "editor.action.codeAction",
    [Mode.Normal + "7"]: "editor.action.deleteLines",
    [Mode.Normal + "8"]: "workbench.action.quickOpen",
    [Mode.Normal + '0']: "workbench.action.debug.start",


    [Mode.Normal + "l"]: "cursorRight",
    [Mode.Normal + "L"]: "cursorEnd",
    [Mode.Normal + "h"]: "cursorLeft",
    [Mode.Normal + "H"]: "cursorHome",


    [Mode.Normal + "o"]: "editor.action.insertLineAfter",
    [Mode.Normal + "O"]: "editor.action.insertLineBefore",
    [Mode.Normal + "b"]: "workbench.action.navigateBack",
    [Mode.Normal + "B"]: "workbench.action.navigateForward",


    [Mode.Normal + "p"]: "editor.action.clipboardPasteAction",
    [Mode.Normal + ">"]: "editor.action.clipboardCopyAction",

    [Mode.Normal + "gh"]: "workbench.action.toggleSidebarVisibility",
    [Mode.Normal + 'gd']: "editor.action.revealDefinition",
    [Mode.Normal + "gl"]: "editor.action.formatDocument",
    [Mode.Normal + "ge"]: "workbench.action.navigateToLastEditLocation",
    [Mode.Normal + "gn"]: "workbench.action.splitEditor",
    [Mode.Normal + 'de']: "deleteAllRight",



    [Mode.Normal + ',']: "editor.action.marker.nextInFiles",
    [Mode.Normal + '<']: "editor.action.marker.prevInFiles",

    [Mode.Normal + 'X']: "workbench.action.closeWindow",
    [Mode.Normal + 'x']: "deleteRight",

    [Mode.Normal + 'u']: "undo",
    [Mode.Normal + 'r']: "redo",
    [Mode.Normal + ':']: "workbench.action.gotoLine",
    [Mode.Normal + 'F']: "actions.find",
    [Mode.Normal + 'f']: "actions.findWithSelection",
    [Mode.Normal + 'n']: "editor.action.nextMatchFindAction",
    [Mode.Normal + 'N']: "editor.action.previousMatchFindAction",
    [Mode.Normal + 't']: "workbench.action.nextEditor",
    [Mode.Normal + 'T']: "workbench.action.previousEditor",
    [Mode.Normal + 'R']: "workbench.action.closeActiveEditor",
    [Mode.Normal + 'E']: "editor.action.addSelectionToNextFindMatch",
    [Mode.Normal + 'e']: "editor.action.smartSelect.expand",
    [Mode.Normal + 's']: "workbench.action.nextEditor",
    [Mode.Normal + '.']: "ohmyvscode.complete",
    [Mode.Normal + 'm']: "ohmyvscode.nextSymbol",
    [Mode.Normal + 'M']: "ohmyvscode.preSymbol",

    [Mode.Normal + 'a']: "workbench.view.explorer",
    [Mode.Normal + 'z']: "workbench.action.toggleZenMode",
    [Mode.Normal + 'c']: "workbench.view.scm",


    [Mode.MOVE + 'e']: "editor.action.moveLinesUpAction",
    [Mode.MOVE + 'd']: "editor.action.moveLinesDownAction",


    [Mode.Select + "j"]: "cursorDownSelect",
    [Mode.Select + "k"]: "cursorUpSelect",
    [Mode.Select + "l"]: "cursorRightSelect",
    [Mode.Select + "h"]: "cursorLeftSelect",
    [Mode.Select + "4"]: "editor.action.clipboardCutAction",
    [Mode.Select + "p"]: "editor.action.clipboardPasteAction",
    [Mode.Select + ">"]: "editor.action.clipboardCopyAction",
    [Mode.Select + "m"]: "workbench.action.terminal.new",

}
```

所以关键的地方是vscode.commands.executeCommand, 可以执行任何注册进去的command


于是vscode又在我手里飞起来了。