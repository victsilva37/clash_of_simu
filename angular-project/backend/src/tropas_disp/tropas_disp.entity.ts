import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Jugador } from 'src/players/players.entity';

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
}
