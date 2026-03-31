import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Aluno } from "../models/aluno";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClienteHttpAluno {
  private http = inject(HttpClient);

    getAlunos(): Observable<Aluno[]> {
      return this.http.get<Aluno[]>('http://localhost:3000/alunos')
    }

    getAlunoById(id: number): Observable<Aluno> {
      return this.http.get<Aluno>('http://localhost:3000/alunos/' + id)
    }

    createAluno(newAluno: Aluno): Observable<Aluno> {
      return this.http.post<Aluno>('http://localhost:3000/alunos', newAluno)
    }

    updateAluno(id: number, updatedAluno: Aluno): Observable<Aluno> {
      return this.http.patch<Aluno>('http://localhost:3000/alunos/' + id, updatedAluno)
    }

    deleteAluno(id: number): Observable<void> {
      return this.http.delete<void>('http://localhost:3000/alunos/' + id)
    }
}


