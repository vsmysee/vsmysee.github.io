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
vscode.window.onDidChangeActiveTextEditor((editor) => symbol.onDidChangeActiveTextEditor(editor)),
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

所以关键的地方是vscode.commands.executeCommand, 可以执行任何注册进去的command


于是vscode又在我手里飞起来了。