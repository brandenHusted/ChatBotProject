import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';


const HomeScreen: React.FC = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const [knowledgeBase, setKnowledgeBase] = useState<{ question: string; answer: string }[]>([
        { question: 'Hi how are you', answer: 'I am doing great today, thanks for asking! How about you?' }
    ]);
    const [isTeachingMode, setIsTeachingMode] = useState<boolean>(false);
    const [normalChatBot, setnormalChatBot] = useState<boolean>(false);
([])
    // Animation for the menu
    const [menuVisible, setMenuVisible] = useState(false);
    const translateX = useState(new Animated.Value(-250))[0];

    useEffect(() => {
        if (!isTeachingMode && chatHistory.length >= 2) {
            const lastUserMessage = chatHistory[chatHistory.length - 2].message;
            const response = simulateChatbotResponse(lastUserMessage);
            setChatHistory(prevChatHistory => [
                ...prevChatHistory.slice(0, -1),
                { sender: 'bot', message: response }
            ]);
        }
    }, [knowledgeBase, isTeachingMode, normalChatBot]);

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

    function simulateChatbotResponse(userInput: string): string {
        const bestMatch: string | null = findBestMatch(userInput, knowledgeBase.map(question => question.question));
        if (normalChatBot == true) {
            if (bestMatch) {
                return knowledgeBase.find(question => question.question === bestMatch)!.answer;  
        } else {
            setIsTeachingMode(false);
            return 'I do not have an answer to your question. Would you like to ask me a different question?'
        }
    }
        if (bestMatch) {
            return knowledgeBase.find(question => question.question === bestMatch)!.answer;
        } else {
            setIsTeachingMode(true);
            setnormalChatBot(false);
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

    const undo = (): void => {
        setChatHistory(prevChatHistory => {
            if (prevChatHistory.length < 2) return prevChatHistory;
            return prevChatHistory.slice(0, -2);
        });
        setKnowledgeBase(prevKnowledgeBase => {
            if (prevKnowledgeBase.length === 0) return prevKnowledgeBase;
            const lastUserMessage = chatHistory[chatHistory.length - 2]?.message;
            return prevKnowledgeBase.filter(item => item.question !== lastUserMessage);
        });

        setCorrectAnswer('');
        setIsTeachingMode(false);
    };

    const handleTeachMe = (): void => {
        if (chatHistory.length < 2) return;
        if (!correctAnswer.trim()) {
            alert('Please type an answer for the chatbot to learn.');
            return;
        }

        setKnowledgeBase(prevKnowledgeBase => [
            ...prevKnowledgeBase,
            { question: chatHistory[chatHistory.length - 2].message, answer: correctAnswer }
        ]);

        setCorrectAnswer('');
        setIsTeachingMode(false);
    };

    const toggleMenu = (): void => {
        setMenuVisible(!menuVisible);
        Animated.timing(translateX, {
            toValue: menuVisible ? -250 : 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };
    
    const closeMenu = (): void => {
        setMenuVisible(false);
        Animated.timing(translateX, {
            toValue: -250,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const normalChat = () => {
        setRefresh(refresh + 1);  
        setnormalChatBot(true); 
    };

    const userInputAI = () => {
        setRefresh(refresh + 1);  
        setnormalChatBot(false); 
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                    <Text>☰</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={undo} style={styles.undoButton}>
                    <Text>Undo</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.menuContainer, { transform: [{ translateX }] }]}>
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing}>
                    <Button title="Normal AI" onPress={normalChat} />
                </View>
                <View style={styles.buttonSpacing}>
                    <Button title="User Input AI" onPress={userInputAI} />
                </View>
            </Animated.View>
            <ScrollView style={styles.chatContainer}>
                {chatHistory.map((message, index) => (
                    <Text key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        {message.message}
                    </Text>
                ))}
            </ScrollView>
            {!isTeachingMode && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={userInput}
                        onChangeText={(text) => setUserInput(text)}
                    />
                    <Button title="Send" onPress={sendMessageToChatbot} />
                </View>
            )}
            {isTeachingMode && (
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
    },
    menuButton: {
        padding: 25,
    },
    undoButton: {
        padding: 25,
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 250,
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        padding: 20,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    chatContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
        backgroundColor: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
    },
    teachMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#e1ffc7',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        color: 'black',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        color: 'black',
    },
    buttonSpacing: {
        marginVertical: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
});

export default HomeScreen;