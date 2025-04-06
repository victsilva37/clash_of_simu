import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Jugador } from 'src/players/players.entity';

@Entity('HEROE_DISP') // Manteniendo el esquema original
export class HeroesDisp {
  @PrimaryColumn({ name: 'ID_HEROE', type: 'number' })
  idHeroe: number;

  @Column({ name: 'NOMBRE_HEROE', type: 'varchar2', length: 30 })
  nombreHeroe: string;

  @Column({ name: 'NIVEL_HEROE', type: 'number' })
  nivelHeroe: number;

  @ManyToOne(() => Jugador, (jugador) => jugador.heroes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JUGADOR_ID_JUGADOR' }) 
  jugador: Jugador;
}
