import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BaseService } from '../service/base.service';
import { CrudModel } from './crud.model';

@Injectable()
export class CrudService extends BaseService {
  restUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.restUrl = this.rootPath + '/kafka';
  }

  getSeries(): Promise<CrudModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(this.restUrl + '/series')
          .subscribe((data) => {
            resolve(data as CrudModel[]);
          });
      }, 25);
    });
  }

}
