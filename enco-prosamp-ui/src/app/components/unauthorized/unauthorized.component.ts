import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `<h1>Unauthorized</h1><p>You do not have access to this page.</p>`,
  styles: ['h1 { color: red; }'],
})
export class UnauthorizedComponent {

}

