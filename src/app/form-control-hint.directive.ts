import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  ViewContainerRef,
  ViewChild,
  HostBinding,
} from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Directive({
  selector: "[appFormControlHint]",
})
export class FormControlHintDirective implements OnInit {
    @ViewChild("myContainerRef", {read: ElementRef}) elementRef2: ElementRef;
  @HostBinding('class.active') isActive:boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private vcRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.createComponent();
  }

  createComponent() {
    
    const matHintElement = this.renderer.createElement("mat-hint");
    this.renderer.addClass(matHintElement, "control-states");
    type States = "valid" | "untouched" | "pristine";
    // Create and append the HTML structure to mat-hint
    const icons : {name: string; condition: States }[] = [
      { name: "fact_check", condition: "valid" },
      { name: "fingerprint", condition: "untouched" },
      { name: "auto_awesome", condition: "pristine" },
    ];
    icons.forEach((icon) => {
      const matIcon = this.vcRef.createComponent(MatIcon);
      matIcon.instance.fontIcon = icon.name;

      
      const matIconEl = matIcon.injector.get(MatIcon)._elementRef.nativeElement;
      
     
      this.renderer.addClass(matIconEl, icon.condition);

      matIconEl.textContent = icon.name;
      this.renderer.appendChild(matHintElement, matIconEl);
    });
    // Find the parent mat-form-field element by traversing up the DOM
    let parentElement = this.elementRef.nativeElement.parentElement;
    while (
      parentElement &&
      !parentElement.classList.contains("mat-mdc-form-field")
    ) {
      parentElement = parentElement.parentElement;
    }

    // Insert the mat-hint element after the input element
    const formElement = (parentElement.querySelector("input") ?? parentElement.querySelector("mat-select"));
    if (formElement) {
      this.renderer.appendChild(parentElement, matHintElement);
    }
  }
}
