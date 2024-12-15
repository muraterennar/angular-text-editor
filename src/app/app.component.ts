import {Component, OnInit} from '@angular/core';
import {KatexOptions, MarkdownModule} from 'ngx-markdown';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentEditableDirective} from './common/directives/content-editable.directive';
import {CopyClipboardComponent} from './common/components/copy-clipboard/copy-clipboard.component';

@Component({
  selector: 'app-root',
  imports: [MarkdownModule, FormsModule, ReactiveFormsModule, ContentEditableDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-text-editor';

  // Markdown içeriği
  markdown: string = `# Hello World
This is a markdown editor.

Inline \`code\` has \`back-ticks around\` it.

\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`

\`\`\`html
<h1>Hello World</h1>
<h2>Hello World 2</h2>
<h3>Hello World 2</h3>
\`\`\`
I ❤️ ngx-markdown

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
⋅⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)


* Unordered list can use asterisks
- Or minuses
+ Or pluses

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.

[I'm an inline-style link](https://www.google.com)

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on GitHub, for example).

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

---

## KaTeX Example

You can render LaTeX mathematical expressions using **KaTeX** in Markdown. For example:

The *Gamma function* satisfying $\\\\Gamma(n) = (n-1)!\\\\quad\\\\forall n\\\\in\\\\mathbb{N}$ is defined using the Euler integral:

$$
\\\\Gamma(z) = \\\\int_0^\\\\infty t^{z-1}e^{-t} \\\\, dt
$$

Another example of a quadratic equation:

$$
x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}
$$

Enjoy writing beautiful math expressions with **KaTeX** and Markdown!

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

\`\`\`mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
\`\`\`

And this will produce a flow chart:

\`\`\`mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
\`\`\`


Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3

`;

  // Form grubu
  markdownEditorForm: FormGroup;
  readonly copyClipboardComponent = CopyClipboardComponent;

  public options: KatexOptions = {
    displayMode: true,
    throwOnError: true,
    errorColor: '#cc0000',
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false},
      {left: '\\(', right: '\\)', display: false},
      {left: '\\[', right: '\\]', display: true}
    ],
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeMarkdownEditor();
    this.trackMarkdownChanges();
  }

  // Formu başlatır
  initializeMarkdownEditor() {
    this.markdownEditorForm = this.formBuilder.group({
      markdown: [this.markdown], // Başlangıç içeriği
    });
  }

  // İçerik değişikliklerini izler
  trackMarkdownChanges() {
    this.markdownEditorForm.get('markdown').valueChanges.subscribe((updatedMarkdown) => {
      this.markdown = updatedMarkdown; // Markdown bileşenine aktarılır
    });
  }
}
