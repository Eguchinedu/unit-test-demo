import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unit-test-demo';
  btnText = "subscribe"
  isSubscribed = false;

  subscribe(){
    setTimeout(() => {
    this.isSubscribed = true;
    this.btnText = "Subscribed";
  }, 3000)
}
}
