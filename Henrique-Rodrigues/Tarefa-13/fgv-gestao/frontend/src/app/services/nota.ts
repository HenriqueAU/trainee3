import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Nota } from "../models/nota";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ClienteHttpNota {
  private http = inject(HttpClient);

    getNotas(alunosId: number): Observable<Nota[]> {
      return this.http.get<Nota[]>('http://localhost:3000/notas/alunos/' + alunosId)
    }

    createNota(newNota: Nota): Observable<Nota> {
      return this.http.post<Nota>('http://localhost:3000/notas', newNota)
    }

    updateNota(id: number, updatedNota: Nota): Observable<Nota> {
      return this.http.patch<Nota>('http://localhost:3000/notas/' + id, updatedNota)
    }
}
//Falta implementar
