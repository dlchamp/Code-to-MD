const vscode = require('vscode');


function escapeBackticks(text) {
	if (/```/.test(text)) {
		return text.replace(/```/g, '\\`\\`\\`');
	}
	return text
}

function removeInitialIndentation(text) {
	const lines = text.split('\n');
	const minIndentation = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));
	return lines.map(line => line.slice(minIndentation)).join('\n');
}

function formatSelectedText(text) {
	const leftAlignedText = removeInitialIndentation(text)
	const escapedText = escapeBackticks(leftAlignedText)

	return escapedText;
}


async function getEditorSelection() {
	const editor = vscode.window.activeTextEditor;
	await vscode.commands.executeCommand('editor.action.formatDocument');
	const selectedText = editor.document.getText(editor.selection);
	const language = editor.document.languageId;
	const prettifiedText = await formatSelectedText(selectedText, language);

	return [prettifiedText, language];
}


async function copyToDiscord() {
	const [text, language] = await getEditorSelection();
	const formattedText = `\`\`\`${language}\n${text}\n\`\`\``;
	await vscode.env.clipboard.writeText(formattedText);
}

async function copyToReddit() {
	const [text, _] = await getEditorSelection();
	const formattedText = text.split('\n').map(line => '    ' + line).join('\n');
	await vscode.env.clipboard.writeText(formattedText);
}

function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('code-to-md.copyToDiscord', copyToDiscord),
		vscode.commands.registerCommand('code-to-md.copyToReddit', copyToReddit)
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate,
};
