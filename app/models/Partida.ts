import { Jogador } from "./Jogador";
import { Peca } from "./Peca";

export class Partida {
    private jogador1: Jogador;
    private jogador2: Jogador;
    private tabuleiro: Peca[][];
    private vezPrimeiro: boolean;

    constructor(j1: Jogador, j2: Jogador) {
        this.jogador1 = j1;
        this.jogador2 = j2;
        this.tabuleiro = Array(3).fill(null).map(() => Array(3).fill(Peca.VAZIO));
        this.vezPrimeiro = true;
    }

    joga(linha: number, coluna: number): void {
        const peca = this.vezPrimeiro ? Peca.X : Peca.O;
        if (this.tabuleiro[linha][coluna] === Peca.VAZIO) {
        this.tabuleiro[linha][coluna] = peca;
        this.vezPrimeiro = !this.vezPrimeiro;
        }
    }

    verificaFim(): number {
        const linhas = this.tabuleiro;

        // Linhas, colunas e diagonais
        for (let i = 0; i < 3; i++) {
        if (linhas[i][0] !== Peca.VAZIO && linhas[i][0] === linhas[i][1] && linhas[i][1] === linhas[i][2]) {
            return linhas[i][0] === Peca.X ? 1 : 2;
        }
        if (linhas[0][i] !== Peca.VAZIO && linhas[0][i] === linhas[1][i] && linhas[1][i] === linhas[2][i]) {
            return linhas[0][i] === Peca.X ? 1 : 2;
        }
    }

    if (linhas[0][0] !== Peca.VAZIO && linhas[0][0] === linhas[1][1] && linhas[1][1] === linhas[2][2]) {
        return linhas[0][0] === Peca.X ? 1 : 2;
    }

    if (linhas[0][2] !== Peca.VAZIO && linhas[0][2] === linhas[1][1] && linhas[1][1] === linhas[2][0]) {
        return linhas[0][2] === Peca.X ? 1 : 2;
    }

    // Verifica empate
    if (linhas.flat().every(cel => cel !== Peca.VAZIO)) return 3;
        return 0;
    }

    getTabuleiro(): Peca[][] {
        return this.tabuleiro;
    }

    getVezPrimeiro(): boolean {
        return this.vezPrimeiro;
    }
}
