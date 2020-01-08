import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { startWith, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response: [];
  popdata: {};
  display: boolean;

  tabledataurl = "https://hn.algolia.com/api/v1/search_by_date?tags=story";

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.gettabledata();
  }
  
  gettabledata() {
    interval(10000).pipe(startWith(0), mergeMap(() => this.http.get(this.tabledataurl))).subscribe(resp => {
      this.response = resp['hits'];
      console.log("The Table Data is", this.response);
    });
  }

  showmodaldata(rowdata) {
    this.popdata = rowdata;
    console.log("Modal Data is", this.popdata);
    this.display = true;
  }

  close() {
    this.display = false;
  }

}
