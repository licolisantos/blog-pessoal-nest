// Importa os decorators do TypeORM para mapeamento da entidade
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Importa a entidade Tema para o relacionamento
import { Tema } from '../../tema/entities/tema.entity';

// Importa a entidade Usuario via barrel file
import { Usuario } from '../../usuario/entities';

// Define a tabela tb_postagens no banco de dados
@Entity({ name: 'tb_postagens' })
export class Postagem {

  // Chave primária gerada automaticamente
  @PrimaryGeneratedColumn()
  id: number;

  // Título da postagem (até 100 caracteres)
  @Column({ length: 100 })
  titulo: string;

  // Texto da postagem (até 1000 caracteres)
  @Column({ length: 1000 })
  texto: string;

  // Data de criação da postagem
  // Valor padrão é o timestamp atual do banco
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  // Relacionamento muitos-para-um com Tema
  // Várias postagens podem pertencer a um mesmo tema
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;

  // Relacionamento muitos-para-um com Usuario
  // Várias postagens podem ser criadas por um mesmo usuário
  @ManyToOne(() => Usuario, (usuario) => usuario.postagens, {
  onDelete: 'CASCADE'
})
usuario: Usuario;
}
