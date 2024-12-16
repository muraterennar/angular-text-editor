import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CopyClipboardComponent} from '../../common/components/copy-clipboard/copy-clipboard.component';
import {KatexOptions, MarkdownModule} from 'ngx-markdown';
import {ContentEditableDirective} from '../../common/directives/content-editable.directive';
import {BreadcrumbComponent} from '../../common/components/breadcrumb/breadcrumb.component';
import {markdownStaticData} from '../../../../public/datas/markdown-static-data';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-markdown-editor',
  imports: [CommonModule,MarkdownModule, FormsModule, ReactiveFormsModule, ContentEditableDirective, BreadcrumbComponent],
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css'
})
export class MarkdownEditorComponent implements OnInit {
  // Static Markdown İçeriği
  staticMarkdown: string = markdownStaticData;
  isStaticMarkdown: boolean = true;
  // Markdown İçeriği
  markdown: string = "";

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

  // Toggle işlemi
  toggleMarkdownSource() {
    this.isStaticMarkdown = !this.isStaticMarkdown;
  }
}
