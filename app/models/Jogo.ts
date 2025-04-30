import { Jogador } from "./Jogador";
import { Partida } from "./Partida";

export class Jogo {
    private numeroPartidas: number = 0;

    getNumeroPartidas(): number {
        return this.numeroPartidas;
    }

    iniciarPartida(j1: Jogador, j2: Jogador): Partida {
        this.numeroPartidas++;
        return new Partida(j1, j2);
    }

    reiniciarJogo(): void {
        this.numeroPartidas = 0;
    }
}
