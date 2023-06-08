import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})

export class AppComponent {
  
  title = 'TPFinalLABO4';
  timeout: any;
  
  loader = true;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  getState(outlet:any)  {
		return outlet.activatedRouteData.state;
	}

  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.loader = false;
      }, 1000);
    }
  }
}
