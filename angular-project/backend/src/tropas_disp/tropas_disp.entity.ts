import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Jugador } from 'src/players/players.entity';
import { TrainTropa } from 'src/train_tropa/train_tropa.entity';

@Entity('TROPA_DISP') // Manteniendo el esquema original
export class TropaDisp {
  @PrimaryColumn({ name: 'ID_TROPA', type: 'number' })
  idTropa: number;

  @Column({ name: 'NOMBRE_TROPA', type: 'varchar2', length: 30 })
  nombreTropa: string;

  @Column({ name: 'NIVEL_TROPA', type: 'number' })
  nivelTropa: number;

  @Column({ name: 'ESPACIO_TROPA', type: 'number' })
  espacioTropa: number;

  @ManyToOne(() => Jugador, (jugador) => jugador.troops, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JUGADOR_ID_JUGADOR' }) 
  jugador: Jugador;


  @OneToMany(() => TrainTropa, (train_troop) => train_troop.troop)
  train_troop: TrainTropa[];
}
