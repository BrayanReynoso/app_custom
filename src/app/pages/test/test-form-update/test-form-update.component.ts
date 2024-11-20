import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test-form-update',
  standalone: true,
  imports: [],
  templateUrl: './test-form-update.component.html',
  styleUrl: './test-form-update.component.scss'
})
export class TestFormUpdateComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any 
  ){
    this.data = {...data}
  }
  ngOnInit(): void {
   console.log("Data pasada -> ", this.data);
  }

}
