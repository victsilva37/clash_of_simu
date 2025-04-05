import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Jugador } from 'src/players/players.entity';

@Entity('HECHIZO_DISP') // Manteniendo el esquema original
export class HechizosDisp {
  @PrimaryColumn({ name: 'ID_HECHIZO', type: 'number' })
  idHechizo: number;

  @Column({ name: 'NOMBRE_HECHIZO', type: 'varchar2', length: 30 })
  nombreHechizo: string;

  @Column({ name: 'NIVEL_HECHIZO', type: 'number' })
  nivelHechizo: number;

  @Column({ name: 'ESPACIO_HECHIZO', type: 'number' })
  espacioHechizo: number;

  @ManyToOne(() => Jugador, (jugador) => jugador.spells, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'JUGADOR_ID_JUGADOR' }) 
  jugador: Jugador;
}
