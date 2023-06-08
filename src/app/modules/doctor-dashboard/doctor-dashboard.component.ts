import { trigger, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
  animations: [
    trigger('doctor', [
      transition('* => doctor', [animate('1s')])
    ]),
  ]
})
export class DoctorDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getState(outlet:any)  {
		return outlet.activatedRouteData.state;
	}

}
