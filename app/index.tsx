import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { Jogador } from './models/Jogador';
import { JogadorAutomatizado } from './models/JogadorAutomatizado';
import { Jogo } from './models/Jogo';
import { Peca } from './models/Peca';

const jogo = new Jogo();
const jogador1 = new Jogador("Você");
const jogador2 = new JogadorAutomatizado("Bot");
let partida = jogo.iniciarPartida(jogador1, jogador2);

const Index = () => {
  const [tabuleiro, setTabuleiro] = useState(partida.getTabuleiro());
  const [vezJogador1, setVezJogador1] = useState(partida.getVezPrimeiro());
  const [fimDeJogo, setFimDeJogo] = useState(false);
  
  const jogar = (linha: number, coluna: number) => {
    if (fimDeJogo || tabuleiro[linha][coluna] !== Peca.VAZIO) return;

    partida.joga(linha, coluna);
    const novoTabuleiro = [...partida.getTabuleiro().map(l => [...l])];
    setTabuleiro(novoTabuleiro);
    setVezJogador1(partida.getVezPrimeiro());

    const resultado = partida.verificaFim();
    if (resultado !== 0) {
      setFimDeJogo(true);
      mostrarResultado(resultado);
    }
  };

  const mostrarResultado = (resultado: number) => {
    if (resultado === 1) {
      jogador1.adicionaVitoria();  
      Alert.alert("Fim de jogo", "Você venceu!");
    } else if (resultado === 2) {
      jogador2.adicionaVitoria();  
      Alert.alert("Fim de jogo", "O bot venceu!");
    } else {
      Alert.alert("Empate", "Ninguém venceu!");
    }
    setTimeout(() => {
      reiniciarPartida();  
    }, 2000);  
  };

  const jogarBot = () => {
    const opcoes: [number, number][] = [];
    tabuleiro.forEach((linha, i) => {
      linha.forEach((casa, j) => {
        if (casa === Peca.VAZIO) opcoes.push([i, j]);
      });
    });
    if (opcoes.length === 0) return;

    const [linha, coluna] = opcoes[Math.floor(Math.random() * opcoes.length)];
    jogar(linha, coluna);
  };

  useEffect(() => {
    if (!vezJogador1 && !fimDeJogo) {
      setTimeout(jogarBot, 500);
    }
  }, [vezJogador1]);

  const reiniciar = () => {
    // Zera as vitórias e derrotas
    jogador1.resetarEstatisticas();
    jogador2.resetarEstatisticas();
  
    // Reinicia a partida
    partida = jogo.iniciarPartida(jogador1, jogador2);
  
    // Atualiza o estado do tabuleiro e do turno
    setTabuleiro(partida.getTabuleiro());
    setVezJogador1(partida.getVezPrimeiro());
    setFimDeJogo(false);
  };

  const reiniciarPartida = () => {
    // Reinicia a partida, mas mantém as vitórias e derrotas
    partida = jogo.iniciarPartida(jogador1, jogador2);
    
    // Atualiza o estado do tabuleiro e do turno
    setTabuleiro(partida.getTabuleiro());
    setVezJogador1(partida.getVezPrimeiro());
    setFimDeJogo(false);
  };
  

  const getBotaoStyle = (casa: Peca) => {
    switch (casa) {
      case Peca.X:
        return styles.botaoX; // Botão vermelho para "X"
      case Peca.O:
        return styles.botaoO; // Botão azul para "O"
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.info}>Vez de: {vezJogador1 ? "Você" : "Bot"}</Text>
      {tabuleiro.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((casa, j) => (
            <Pressable
              key={j}
              style={[styles.casa, getBotaoStyle(casa)]}
              onPress={() => jogar(i, j)}
              disabled={!vezJogador1 || fimDeJogo}
            >
              <Text style={styles.texto}>{casa}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <Pressable style={styles.botao} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar</Text>
      </Pressable>
      <Text style={styles.info}>Vitórias: Você {jogador1.getVitorias()} x {jogador2.getVitorias()} Bot</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },
  info: {
    fontSize: 18,
    marginVertical: 4
  },
  linha: {
    flexDirection: 'row'
  },
  casa: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8
  },
  texto: { fontSize: 32, fontWeight: 'bold' },
  botao: {
    marginTop: 20,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
  botaoX: {
    backgroundColor: 'lightcoral',
  },
  botaoO: {
    backgroundColor: 'lightblue',
  },
  textoBotao: { color: 'white', fontWeight: 'bold' }
});

export default Index;