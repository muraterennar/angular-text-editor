import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[contentEditable][formControlName],[contentEditable][formControl],[contentEditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true
    }
  ]
})
export class ContentEditableDirective {

  private onChange: (value: string) => void;
  private onTouched: () => void;

  constructor(private elementRef: ElementRef) {
  }

  // Yazılan değeri modelle senkronize et
  @HostListener('input')
  handleInput() {
    const value = this.elementRef.nativeElement.innerText;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  // Alan tıklandığında touched olarak işaretle
  @HostListener('blur')
  handleBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  // Form kontrolüne yeni bir değer yazıldığında
  writeValue(value: string): void {
    this.elementRef.nativeElement.innerText = value || '';
  }

  // Angular tarafından onChange fonksiyonu atanır
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Angular tarafından onTouched fonksiyonu atanır
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Alanı devre dışı bırakma
  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.contentEditable = !isDisabled;
  }

}
