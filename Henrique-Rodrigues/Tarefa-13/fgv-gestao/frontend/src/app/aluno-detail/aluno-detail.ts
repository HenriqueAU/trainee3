import { Component, inject, OnInit, signal } from '@angular/core';
import { ClienteHttpAluno } from '../services/aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../models/aluno';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aluno-detail',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, MatCardModule, DatePipe],
  templateUrl: './aluno-detail.html',
  styleUrl: './aluno-detail.scss',
})
export class AlunoDetail implements OnInit{
  private clienteHttpAluno = inject(ClienteHttpAluno);
  private router = inject(Router);
  private activatedRoute= inject(ActivatedRoute)
  private fb = inject(FormBuilder)

  userId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  aluno = signal<Aluno[]>([]);

  carregando = signal(false);

  erro = signal('');

  editando = signal(false);

  alunoForm = this.fb.group({
    nome: [''],
    cpf: [''],
    nomePai: [''],
    nomeMae: [''],
    necessidadesEspeciais: [false],
    dataEntrada: [''],
  });

  onClickVoltar(){
    this.router.navigate([''])
  }

  onClickEdit(){
    this.editando.set(true)
    this.alunoForm.patchValue({
      nome: this.aluno()[0].nome,
      cpf: this.aluno()[0].cpf,
      nomePai: this.aluno()[0].nomePai,
      nomeMae: this.aluno()[0].nomeMae,
      necessidadesEspeciais: this.aluno()[0].necessidadesEspeciais,
      dataEntrada: this.aluno()[0].dataEntrada.substring(0, 10),
    })
  }

  onClickCancelEdit(){
    this.editando.set(false)
  }

  onClickDelete(userId: number) {
    let confirmacao = window.confirm('Tem certeza que quer deletar o aluno?')
      if (confirmacao === true) {
      this.clienteHttpAluno.deleteAluno(userId).subscribe({
        next: () => {
          this.router.navigate([''])
        },
        error: (err) => {
          this.erro.set(`Aluno com id ${userId} não econtrado`)
        },
        complete() {
          console.log('Operação concluída com sucesso')
        },
      })
    } else {
        alert('Exclusão cancelada!')
      }
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
    this.listaAlunoPorId(+this.userId!)
  }

  onSubmitEdit(){
    this.clienteHttpAluno.updateAluno(+this.userId!, this.alunoForm.value as Aluno).subscribe({
        next: (aluno) => {
          this.aluno.set([aluno])
          this.carregando.set(false)
          this.editando.set(false)
          this.listaAlunoPorId(+this.userId!)
        },
        error: (err) => {
          this.erro.set(`Aluno com id ${this.userId} não atualizado`)
          this.carregando.set(false)
        },
        complete() {
          console.log('Operação concluída com sucesso')
        },
    });
  }
}
