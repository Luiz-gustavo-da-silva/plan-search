import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjPlanos, Plano, PlanoDetalhado } from '../models/plan-interface';
import { FilterPlan } from '../models/filter-plan-interface';

@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  private apiUrl = '/api/operadoras-entity/v1/operadoras';

  constructor(private http: HttpClient) {}

  findAll(): Observable<ObjPlanos> {
    return this.http.get<ObjPlanos>(this.apiUrl);
  }

  findFilterPlan(filter: FilterPlan): Observable<ObjPlanos> {
    const params = this.buildFilter(filter);
    return this.http.get<ObjPlanos>(this.apiUrl, { params });
  }

  getPlanoDetalhado(registro_ans: string):Observable<PlanoDetalhado>{
    const url = this.apiUrl + "/"+ registro_ans;
    return this.http.get<PlanoDetalhado>(url);
  }

  findAllPage(nextPage: number, filter: FilterPlan): Observable<ObjPlanos> {
    var params = this.buildFilter(filter);
    params = params.set('page', nextPage);

    return this.http.get<ObjPlanos>(this.apiUrl, { params });
  }

  buildFilter(filter: FilterPlan): HttpParams{
    let params = new HttpParams();

    if (filter.nomePlano) {
      params = params.set('nome_fantasia', filter.nomePlano);
    }

    if (filter.cnpj) {
      params = params.set('cnpj', filter.cnpj);
    }

    if (filter.status === 'ativos') {
      params = params.set('ativa', '0');
    } else if (filter.status === 'fechados') {
      params = params.set('ativa', '1');
    }

    return params;
  }
}
