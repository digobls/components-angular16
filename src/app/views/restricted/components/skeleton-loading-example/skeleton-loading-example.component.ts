import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skeleton-loading-example',
  templateUrl: 'skeleton-loading-example.component.html',
  styleUrls: [`skeleton-loading-example.component.scss`]
})

export class SkeletonLoadingExampleComponent implements OnInit {
  listDisplay: any = [{id: 1, name: 'block'}, {id: 2, name: 'inline-block'}];
  formSkeleton: FormGroup = new FormGroup({
    width: new  FormControl( '300px'),
    height: new  FormControl( '40px'),
    margin: new  FormControl( '10px 20px 0 0'),
    display: new  FormControl( {id: 1, name: 'block'}),
  });

  constructor() { }

  public ngOnInit() { }
}
