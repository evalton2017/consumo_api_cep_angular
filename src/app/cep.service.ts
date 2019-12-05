import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Cep } from './cep';
import { reject } from 'q';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http:HttpClient) { }

  buscar(cep:string){
    return new Promise((resolve,reject)=>{
      this.http.get(`http://viacep.com.br/ws/${cep}/json/`)

      .subscribe((resultado:any)=>{
        resolve(this.recuperarDados(resultado))
      },
      (error)=>{
        reject(error.json());
      })
    })
     
  }

  recuperarDados(cepRes):Cep{
    let cep = new Cep();
    cep.cep = cepRes.cep;
    cep.logradouro = cepRes.logradouro;
    cep.bairro = cepRes.bairro;
    cep.cidade = cepRes.localidade;
    cep.uf = cepRes.uf;

    return cep;

  }
}
