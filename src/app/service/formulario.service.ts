import { HttpClient } from '@angular/common/http';
import { PessoaModel } from './../models/pessoaModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  url = "http://localhost:3001/pessoas";

  constructor(private http: HttpClient) { }

  salvar (pessoa : PessoaModel) : Observable<PessoaModel>{
    return this.http.post<PessoaModel>(this.url, pessoa)
  }

  listarPessoas (): Observable<PessoaModel[]>{
    return this.http.get<PessoaModel[]>(this.url)
  }
}
