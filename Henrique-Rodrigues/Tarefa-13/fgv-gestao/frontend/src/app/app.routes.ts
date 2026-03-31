import { Routes } from '@angular/router';
import { AlunoList } from './aluno-list/aluno-list';
import { AlunoForm } from './aluno-form/aluno-form';
import { AlunoDetail } from './aluno-detail/aluno-detail';

export const routes: Routes = [
  {
    path: '',
    component: AlunoList,
  },
  {
    path: 'create',
    component: AlunoForm,
  },
  {
    path: 'detail/:id',
    component: AlunoDetail,
  },
];
