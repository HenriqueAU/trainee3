import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './alunos/alunos.entity';
import { Nota } from './notas/notas.entity';
import { AlunoModule } from './alunos/alunos.module';
import { NotaModule } from './notas/notas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'db_escola',
      entities: [Aluno, Nota],
      synchronize: false,
    }),
    AlunoModule,
    NotaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
