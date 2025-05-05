export class Jogador {
    private nome: string;
    private vitorias: number = 0;

    constructor(nome: string) {
        this.nome = nome;
    }

    resetarEstatisticas() {
        this.vitorias = 0;
    }

    getNome(): string {
        return this.nome;
    }

    getVitorias(): number {
        return this.vitorias;
    }

    adicionaVitoria(): void {
        this.vitorias++;
    }
}
