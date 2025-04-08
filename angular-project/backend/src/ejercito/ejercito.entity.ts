import { TrainTropa } from 'src/train_tropa/train_tropa.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('EJERCITO')
export class Ejercito {
  @PrimaryGeneratedColumn({ name: 'ID_EJERCITO' })
  id_ejercito: number;

  @Column({ name: 'FECHA_EJERCITO' })
  fecha_ejercito: Date;

  @OneToMany(() => TrainTropa, (train_troop) => train_troop.ejercito) // Relación inversa con Troop
  train_troop: TrainTropa[];
}
