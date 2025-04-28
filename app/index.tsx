import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';

// Função para verificar se há um vencedor
const checkWinner = (board: (string | null)[]): string | null => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // X or O
    }
  }
  return null;
};

export default function JodoDaVelha() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null)); 
  const [playerWins, setPlayerWins] = useState(0);
  const [botWins, setBotWins] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('Vez do jogador: X');

  const makeMove = (index: number): void => { 
    if (board[index] || checkWinner(board)) return; 

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setStatus(`Vez do jogador: ${isXNext ? 'O' : 'X'}`);

    // Verifica se alguém ganhou
    const winner = checkWinner(newBoard);
    if (winner) {
      setStatus(`Jogador ${winner} ganhou!`);
      Alert.alert(`Jogador ${winner} ganhou!`);

      if (winner == "X") {
        console.log(winner + " ganhou!")
        setPlayerWins(playerWins+1) 
      }

      if (winner == "O") {
        console.log(winner + " ganhou!")
        setBotWins(botWins+1)
      }
    }
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus('Vez do jogador: X');
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>

      {/* Placar de Vitória */}
      <View style={styles.victoryPlate}>
          <Text style={styles.text}>Jogador:</Text>
          <View style={styles.textWinsBox}>
            <Text style={styles.text}>{playerWins}</Text>
          </View> 
          <Text style={styles.text}>x</Text>
          <Text style={styles.text}>Bot:</Text>
          <View style={styles.textWinsBox}>
            <Text style={styles.text}>{botWins}</Text>
          </View>
          <Text style={styles.text}></Text>
      </View>
    
      {/* Tabuleiro */}
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, cell && styles[cell as 'X' | 'O']]} 
            onPress={() => makeMove(index)} 
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Reiniciar */}
      <Text style={styles.status}>{status}</Text>
      <Button title="Reiniciar" onPress={resetGame} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  X: {
    backgroundColor: 'lightblue',
  },
  O: {
    backgroundColor: 'lightcoral',
  },
  cellText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    color: "#B0E0E6", 
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  victoryPlate: {
    flexDirection: 'row',
    backgroundColor: "#808080",
    marginBottom: 30,
    height: 35,
  },
  textWinsBox: {
    backgroundColor: "#FFFFFF"
  },
});


