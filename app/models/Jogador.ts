export class Jogador {
    private nome: string;
    private vitorias: number = 0;

    constructor(nome: string) {
        this.nome = nome;
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
