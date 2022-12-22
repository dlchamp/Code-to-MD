const vscode = require('vscode');
const json5 = require('json5')


function activate(context) {
	vscode.commands.registerCommand('code-to-md.copyToDiscord', copyToDiscord);
	vscode.commands.registerCommand('code-to-md.copyToReddit', copyToReddit);
}

function deactivate() { }

function getEditorSelection() {

	const editor = vscode.window.activeTextEditor;
	const selectedText = editor.document.getText(editor.selection).trim();
	const language = editor.document.languageId;
	const prettifiedText = formatSelectedText(selectedText, language);

	return [prettifiedText, language];
}

function copyToDiscord() {

	const [text, language] = getEditorSelection();
	const formattedText = `\`\`\`${language}\n${text}\n\`\`\``;

	vscode.env.clipboard.writeText(formattedText);
}

function copyToReddit() {

	const [text, _] = getEditorSelection();
	const formattedText = text.split('\n').map(line => '    ' + line).join('\n');

	vscode.env.clipboard.writeText(formattedText);
}

function formatSelectedText(text, language) {

	if (language == 'python') {

		let pyFormatter = vscode.workspace.getConfiguration(null).get('python.formatting.provider') ||
			'ms-python.python';
		let pyFormatterExtension = vscode.extensions.getExtension(pyFormatter);

		if (pyFormatterExtension) {

			let api = pyFormatterExtension.exports;

			return api.formatDocument(text, language);

		} else {

			return text;
		}

	} else if (['javascript', 'typescript'].includes(language)) {

		let jsFormatter = vscode.workspace.getConfiguration(null).get('javascript.format.enable') ||
			'vscode.typescript.language-features';
		let jsFormatterExtension = vscode.extensions.getExtension(jsFormatter);

		if (jsFormatterExtension) {

			let api = jsFormatterExtension.exports;

			return api.formatDocument(text, language);

		} else {

			return text;
		}

	} else if (language == 'json') {

		try {
			return JSON.stringify(json5.parse(text), null, 2);
		} catch (error) {
			return text;
		}

	} else { return text }
}

module.exports = {
	activate,
	deactivate,
};