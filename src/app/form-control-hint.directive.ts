import {
AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormControlHint]',
})
export class FormControlHintDirective implements OnInit {
  @Input('appFormControlHint') targetControl: FormControl;


  constructor(private el: ElementRef, private templateRef: TemplateRef<any>, private renderer: Renderer2) {}

  ngOnInit() {
    let parentElement = this.templateRef.elementRef.nativeElement.parentElement;
    const inputElement = parentElement.querySelector('input');
    
    console.log('inputElement:', inputElement);
  
    // Create an embedded view from the template with context
    const embeddedView = this.templateRef.createEmbeddedView({ targetControl: this.targetControl });
  
    // Create a mat-hint sibling element
    const matHintElement = this.renderer.createElement('mat-hint');
  
    // Create and append the HTML structure to mat-hint
    const icons = ['fact_check', 'fingerprint', 'auto_awesome'];
    icons.forEach(iconName => {
      const iconElement = this.renderer.createElement('mat-icon');
      this.renderer.setAttribute(iconElement, 'ngClass', `{'true': targetControl.valid, 'false': !targetControl.valid}`);
      iconElement.textContent = iconName;
      this.renderer.appendChild(matHintElement, iconElement);
    });
  
    // Find the parent mat-form-field element by traversing up the DOM
    while (parentElement && !parentElement.classList.contains('mat-form-field')) {
      parentElement = parentElement.parentElement;
    }
  
    console.log('parentElement:', parentElement);
  
    if (parentElement) {
      // Insert the mat-hint element before the input element
      if (inputElement) {
        this.renderer.insertBefore(parentElement, matHintElement, inputElement);
      }
    }
  }
}
