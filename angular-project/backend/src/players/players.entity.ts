import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TropaDisp } from 'src/tropas_disp/tropas_disp.entity';

@Entity('JUGADOR')
export class Jugador {
  @PrimaryGeneratedColumn({ name: 'ID_JUGADOR' }) // Coincide con la columna en Oracle
  id_jugador: number;

  @Column({ name: 'TAG' })
  tag: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'TOWNHALLLEVEL' })
  townHallLevel: number;

  @Column({ name: 'EXPLEVEL' })
  expLevel: number;

  @Column({ name: 'TROPHIES' })
  trophies: number;

  @Column({ name: 'WARSTARS' })
  warStars: number;

  @OneToMany(() => TropaDisp, (troop) => troop.jugador) // Relación inversa con Troop
  troops: TropaDisp[];
   
}
