import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl, FormRecord, FormGroup } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { pattern } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';

function checkboxRequired(control: AbstractControl): ValidationErrors | null {
  return control.value === true ? null : { required: true };
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, KeyValuePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private criarControleTelefone() {
    return this.fb.control('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(15),
      Validators.pattern('([0-9]{2}s?)?[0-9]{4,5}-?[0-9]{4}')
    ]);
  }

  private fb = inject(FormBuilder);

  dataUsuario = this.fb.group({
    primeiroNomeUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    sobrenomeUsuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    estadoCivilUsuario: ['', Validators.required],
    maiorDeIdade: [false, checkboxRequired],
    dataAdmissao: ['', Validators.required],
    enderecoUsuario: this.fb.group({
      cidadeUsuario: ['', [Validators.required, Validators.minLength(3)]],
      ruaUsuario: ['', [Validators.required, Validators.minLength(3)]],
      cepUsuario: ['', [Validators.required, Validators.pattern("[0-9]{5}-?[0-9]{3}")]],
    }),
    telefonesUsuario: this.fb.array([
      this.criarControleTelefone()
    ]),
      permissoes: new FormRecord({
      verRelatorios: new FormControl(false),
      editarUsuarios: new FormControl(false),
      acessarFinanceiro: new FormControl(false),
    })
  })

  get endereco() {
    return (this.dataUsuario.get('enderecoUsuario') as FormGroup).controls;
  }

  get f() {
    return this.dataUsuario.controls;
  }

  get telefonesArray() {
    return this.dataUsuario.get('telefonesUsuario') as FormArray;
  }

  adicionaTelefone() {
    this.telefonesArray.push(this.criarControleTelefone());
  }

  removeTelefone(index: number) {
    this.telefonesArray.removeAt(index);
  }

  get permissoesRecord() {
    return this.dataUsuario.get('permissoes') as FormRecord;
  }

  adicionarPermissao(nome: string) {
    this.permissoesRecord.addControl(nome, new FormControl(false));
  }

  removerPermissao(nome: string) {
    this.permissoesRecord.removeControl(nome);
  }

  onSubmit() {
  console.log(this.dataUsuario.value);
  this.dataUsuario.reset();
  }
}

