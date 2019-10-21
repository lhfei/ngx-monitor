import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { BaseService } from '../service/base.service';
import { SystemModel } from './system.model';
import { StatisticsModel } from './statistics.model';

@Injectable()
export class MainService extends BaseService {
  restUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.restUrl = this.rootPath + '/api/v1';
  }

  getSystems(): Promise<SystemModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(this.restUrl + '/systems')
          .subscribe((data) => {
            resolve(data as SystemModel[]);
          });
      }, 25);
    });
  }

  getModules(system: string): Promise<SystemModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(this.restUrl + '/modules' + '?schemaName=' + system)
          .subscribe((data) => {
            resolve(data as SystemModel[]);
          });
      }, 25);
    });
  }

  getStatistics(system: string): Promise<StatisticsModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(this.restUrl + '/statistics' + '?schemaName=' + system)
          .subscribe((data) => {
            resolve(data as StatisticsModel[]);
          });
      }, 25);
    });
  }

  getWords(system: string): Promise<StatisticsModel[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get(this.restUrl + '/words' + '?schemaName=' + system)
          .subscribe((data) => {
            resolve(data as StatisticsModel[]);
          });
      }, 25);
    });
  }
}
