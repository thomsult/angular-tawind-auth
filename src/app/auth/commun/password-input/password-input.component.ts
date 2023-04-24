import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'input-password-toggle',
  template: `
    <input 
    type="{{ type }}" 
    id="{{ id }}"
    name="{{ name }}"
    class="{{ classInput }}"
    (change)="inputChange()" 
    [disabled]="disabled" 
    #input /><button
    aria-label="Toggle password visibility"
    class="ml-auto px-2"
      type="button"
    (click)="handleClick()"
    >
    <fa-icon class="text-gray-700 " [icon]="type=='text'?faEye:faEyeSlash"></fa-icon>
  </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') inputRef!: ElementRef;
  @Input() type!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() classInput!: string;

  disabled = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  value = "0";

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}
  inputChange(){
    this.onChange(this.inputRef.nativeElement.value);
  }
  handleClick() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  ngOnInit(): void {}

  writeValue(value: string): void {
    this.value = value;
   
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
