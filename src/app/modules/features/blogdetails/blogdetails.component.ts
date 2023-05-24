import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ServiceService } from 'src/app/core/http/service.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {
  onDestroy$ = new Subject<boolean>()
  readArticles:any={};
  constructor(
    private _route: ActivatedRoute,
    private _apiService:ServiceService
    ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(res=>{
      console.log(res);
      this.getReadMoreData(res?.['slugData'])
      this.getPopularTagsList();
    })
  }
 getReadMoreData(slug:string) {
   console.log('151');
  this._apiService.getReadMore(slug).pipe(takeUntil(this.onDestroy$)).subscribe((res:any)=>{
    console.log(res?.article);
    this.readArticles = res?.article

  })
 }
 tags:any;
 getPopularTagsList(){
  this._apiService.getPopularTags().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
    this.tags=res;
    console.log(res)
  })
 }
}
