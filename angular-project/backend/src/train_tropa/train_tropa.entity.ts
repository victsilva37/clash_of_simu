import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { TropaDisp } from 'src/tropas_disp/tropas_disp.entity';
import { Ejercito } from 'src/ejercito/ejercito.entity';

@Entity('TRAIN_TROPA')
export class TrainTropa {
  @PrimaryGeneratedColumn({ name: 'ID_TRAIN_TROPA' })
  id_train_tropa: number;

  @Column({ name: 'CANT_TROPA', type: 'number' })
  cant_tropa: number;

  @OneToOne(() => TropaDisp, (tropaDisp) => tropaDisp.train_troop, { eager: true })
  @JoinColumn({ name: 'ID_TROPA' })
  troop: TropaDisp; // Relación con la entidad `TropaDisp`

  @ManyToOne(() => Ejercito, (ejercito) => ejercito.train_troop, { eager: true })
  @JoinColumn({ name: 'EJERCITO_ID_EJERCITO' })
  ejercito: Ejercito; // Relación con la entidad `Ejercito`
}
