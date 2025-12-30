// Importa decorators do TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

// Importa Postagem
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  usuario: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  foto: string;

  // Relacionamento 1:N com Postagem
  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagens: Postagem[];
}
