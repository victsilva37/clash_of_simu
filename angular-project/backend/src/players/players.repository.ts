import { EntityRepository, Repository } from 'typeorm';
import { Jugador } from './players.entity'

@EntityRepository(Jugador)
export class JugadorRepository extends Repository<Jugador> {
  // Métodos adicionales si es necesario
}
