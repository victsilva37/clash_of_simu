import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USUARIOS') // Nombre de la tabla en la base de datos
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 255 })
  email: string;
}


