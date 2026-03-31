import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ClienteHttpAluno } from '../services/aluno';
import { Router } from '@angular/router';
import { Aluno } from '../models/aluno';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aluno-list',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, DatePipe],
  templateUrl: './aluno-list.html',
  styleUrl: './aluno-list.scss',
})
export class AlunoList implements OnInit{
  private clienteHttpAluno = inject(ClienteHttpAluno);
  private router = inject(Router);

  aluno = signal<Aluno[]>([]);

  carregando = signal(false);

  erro = signal('');

  barraPesquisa = signal<string>('');

  alteraListagem = computed(() => {
    if (this.barraPesquisa() === '') {
      return this.aluno().sort((a, b) => a.nome.localeCompare(b.nome))
    }
    return this.aluno().filter((aluno) => aluno.nome.includes(this.barraPesquisa()) || aluno.cpf.includes(this.barraPesquisa()))
  })

  onClick(id: number) {
    this.router.navigate(['detail', id])
  }

  onClick2() {
    this.router.navigate(['create'])
  }

  listaAlunos() {
    this.clienteHttpAluno.getAlunos().subscribe({
      next: (aluno) => {
        this.aluno.set(aluno)
        this.carregando.set(false)
      },
      error: (err) => {
        this.erro.set('Erro durante o carregamento')
        this.carregando.set(false)
      },
      complete() {
        console.log('Operação concluída com sucesso')
      },
    });
  }

  listaAlunoPorId(id: number) {
    this.clienteHttpAluno.getAlunoById(id).subscribe({
      next: (aluno) => {
        this.aluno.set([aluno])
        this.carregando.set(false)
      },
      error: (err) => {
        this.erro.set(`Aluno com id ${id} não econtrado`)
        this.carregando.set(false)
      },
      complete() {
        console.log('Operação concluída com sucesso')
      },
    });
  }

  ngOnInit(): void {
    this.carregando.set(true)
    this.listaAlunos()
  }
}
