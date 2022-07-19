import {async, TestBed} from '@angular/core/testing';

import { SinglestoreService } from './singlestore.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../app.component";


describe('SinglestoreService', () => {
  let service: SinglestoreService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    service = TestBed.inject(SinglestoreService);
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
