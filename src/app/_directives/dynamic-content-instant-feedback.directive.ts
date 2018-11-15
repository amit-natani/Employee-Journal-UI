import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dynamic-content-instant-feedback]',
})
export class DynamicContentInstantFeedbackDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}