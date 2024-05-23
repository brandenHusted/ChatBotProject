import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Function to find the best matching question
function findBestMatch(userInput: string, questions: string[]): string | null {
  const threshold: number = 0.4;
  let bestMatch: string | null = null;
  let bestMatchScore: number = 0;

  questions.forEach((question) => {
      const score: number = calculateSimilarity(userInput, question);
      if (score > threshold && score > bestMatchScore) {
          bestMatch = question;
          bestMatchScore = score;
      }
  });

  return bestMatch;
}

// Function to calculate similarity score between two strings
function calculateSimilarity(str1: string, str2: string): number {
  const len1: number = str1.length;
  const len2: number = str2.length;
  const matrix: number[][] = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
      matrix[i][0] = i;
  }

  for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
          const cost: number = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + cost
          );
      }
  }

  return 1 - matrix[len1][len2] / Math.max(len1, len2);
}

export default function HomeScreen(): JSX.Element {
    const [userInput, setUserInput] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const [knowledgeBase, setKnowledgeBase] = useState<{ question: string; answer: string }[]>([
        { question: 'Hi how are you', answer: 'I am doing great today, Thanks for asking! How about you?' }
    ]);

    // Function to simulate chatbot response
    function simulateChatbotResponse(userInput: string): string {
        const bestMatch: string | null = findBestMatch(userInput, knowledgeBase.map(question => question.question));
        if (bestMatch) {
            return knowledgeBase.find(question => question.question === bestMatch)!.answer;
        } else {
            return 'I do not know the answer. Can you teach me, human?';
        }
    }

    const sendMessageToChatbot = (): void => {
        if (userInput.trim() === '') {
            return;
        }

        setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'user', message: userInput }]);
        const response: string = simulateChatbotResponse(userInput);
        setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'bot', message: response }]);
        setUserInput('');
    };

    const handleTeachMe = (): void => {
        // Add the new question and answer to the knowledge base
        setKnowledgeBase(prevKnowledgeBase => [
            ...prevKnowledgeBase,
            { question: chatHistory[chatHistory.length - 2].message, answer: correctAnswer }
        ]);

        // Clear the correct answer input
        setCorrectAnswer('');

        // Reprocess the user input to see the updated response
        const response: string = simulateChatbotResponse(chatHistory[chatHistory.length - 2].message);
        setChatHistory(prevChatHistory => [
            ...prevChatHistory.slice(0, -1),
            { sender: 'bot', message: response }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                {chatHistory.map((message, index) => (
                    <Text key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        {message.message}
                    </Text>
                ))}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={userInput}
                    onChangeText={(text) => setUserInput(text)}
                />
                <Button title="Send" onPress={sendMessageToChatbot} />
            </View>
            {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].message === 'I do not know the answer. Can you teach me, human?' && (
                <View style={styles.teachMeContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the correct answer..."
                        value={correctAnswer}
                        onChangeText={(text) => setCorrectAnswer(text)}
                    />
                    <Button title="Teach Me" onPress={handleTeachMe} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#d3d3d3',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    teachMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});
