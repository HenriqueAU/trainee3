import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClienteHttpAluno } from '../services/aluno';
import { Aluno } from '../models/aluno';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-aluno-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './aluno-form.html',
  styleUrl: './aluno-form.scss',
})
export class AlunoForm{
  private fb = inject(FormBuilder)
  private clienteHttpAluno = inject(ClienteHttpAluno)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  alunoForm = this.fb.group({
    nome: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
    nomePai: ['', Validators.required],
    nomeMae: ['', Validators.required],
    necessidadesEspeciais: [false],
    dataEntrada: ['', Validators.required],
  });

  openSnackBar() {
    this.snackBar.open('Aluno criado com sucesso', '',{duration: 5000})
  }

  onClickVoltar(){
    this.router.navigate([''])
  }

  erro = signal('');

  onSubmit() {
    this.clienteHttpAluno.createAluno(this.alunoForm.value as Aluno).subscribe({
      next: (x) => {
        this.router.navigate(['detail', x.id])
      },
      error: (err) => {
        this.erro.set('Não foi possível criar o aluno')
      },
      complete(){
        console.log('Operação concluída com sucesso')
      }
    })
  }
}
