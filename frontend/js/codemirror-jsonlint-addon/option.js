import $ from 'balajs';
import assign from 'object.assign';
import CodeMirror from 'codemirror';

CodeMirror.defineOption('jsonlint', false, function(editor, value) {
	let initialized = editor._jsonlint;
	//if(!value && !editor._jsonlint)
	if(value && !initialized) {
		let wrapper = editor.display.wrapper,
			validateButton = assign(wrapper.appendChild($.one('<div>')), {
				className: 'lint-button'
			}),
			notifierBlock = wrapper.appendChild(assign($.one('<div>'), {
				className: 'lint-notifier',
			}));

		assign(editor.display, { notifierBlock, validateButton });

		editor.on('change', () => {
			editor.highlightErrorLine(null);
			editor.notify(null);
		});

		validateButton.addEventListener('click', evt => {
			editor.validate()
		});

		editor._jsonlint = true;
	} else if(!value && !initialized) {
		return;
	} else if(!value && initialized) {
		editor.notifierBlock.style.display = editor.validateButton.style.display = 'none';
	} else if(value && initialized) {
		editor.notifierBlock.style.display = editor.validateButton.style.display = '';
	}
});
