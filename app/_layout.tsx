import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';


const HomeScreen: React.FC = () => {
    const [refresh, setRefresh] = useState<number>(0);
    const [userInput, setUserInput] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const [knowledgeBase, setKnowledgeBase] = useState<{ question: string; answer: string }[]>([
            { question: 'Hi how are you', answer: 'I am doing great today, thanks for asking! How about you?' },
            { question: 'What is your name?', answer: 'I am an AI chatbot created to assist you with various queries.' },
            { question: 'What can you do?', answer: 'I can help with a variety of tasks including answering questions, providing recommendations, and more!' },
            { question: 'What is the capital of France?', answer: 'The capital of France is Paris.' },
            { question: 'What is the largest planet in our solar system?', answer: 'The largest planet in our solar system is Jupiter.' },
            { question: 'Who wrote "To Kill a Mockingbird"?', answer: 'Harper Lee wrote "To Kill a Mockingbird".' },
            { question: 'What is the speed of light?', answer: 'The speed of light is approximately 299,792 kilometers per second.' },
            { question: 'Can you help me with my homework?', answer: 'Sure, I can help with your homework. What do you need help with?' },
            { question: 'Tell me a joke.', answer: 'Why don’t scientists trust atoms? Because they make up everything!' },
            { question: 'What is the tallest mountain in the world?', answer: 'The tallest mountain in the world is Mount Everest.' },
            { question: 'What is 2 + 2?', answer: '2 + 2 equals 4.' },
            { question: 'What is the capital of Japan?', answer: 'The capital of Japan is Tokyo.' },
            { question: 'Who is the president of the United States?', answer: 'As of my last update, the president of the United States is Joe Biden.' },
            { question: 'What is the boiling point of water?', answer: 'The boiling point of water is 100 degrees Celsius or 212 degrees Fahrenheit.' },
            { question: 'What is the largest ocean on Earth?', answer: 'The largest ocean on Earth is the Pacific Ocean.' },
            { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci painted the Mona Lisa.' },
            { question: 'What is the smallest country in the world?', answer: 'The smallest country in the world is Vatican City.' },
            { question: 'How many continents are there?', answer: 'There are seven continents on Earth.' },
            { question: 'What is the capital of Canada?', answer: 'The capital of Canada is Ottawa.' },
            { question: 'What is the chemical symbol for gold?', answer: 'The chemical symbol for gold is Au.' },
            { question: 'What is the tallest building in the world?', answer: 'The tallest building in the world is the Burj Khalifa in Dubai.' },
            { question: 'What is the longest river in the world?', answer: 'The longest river in the world is the Nile River.' },
            { question: 'Who discovered penicillin?', answer: 'Alexander Fleming discovered penicillin.' },
            { question: 'What is the largest desert in the world?', answer: 'The largest desert in the world is the Sahara Desert.' },
            { question: 'What is the most populous country in the world?', answer: 'The most populous country in the world is China.' },
            { question: 'Who invented the telephone?', answer: 'Alexander Graham Bell is credited with inventing the telephone.' },
            { question: 'What is the hottest planet in our solar system?', answer: 'The hottest planet in our solar system is Venus.' },
            { question: 'What is the fastest land animal?', answer: 'The fastest land animal is the cheetah.' },
            { question: 'What is the capital of Germany?', answer: 'The capital of Germany is Berlin.' },
            { question: 'Who wrote "Pride and Prejudice"?', answer: 'Jane Austen wrote "Pride and Prejudice".' },
            { question: 'What is the largest mammal?', answer: 'The largest mammal is the blue whale.' },
            { question: 'What is the most spoken language in the world?', answer: 'The most spoken language in the world is English, but Mandarin Chinese has the most native speakers.' },
            { question: 'What is the coldest place on Earth?', answer: 'The coldest place on Earth is Antarctica.' },
            { question: 'What is the capital of Australia?', answer: 'The capital of Australia is Canberra.' },
            { question: 'What is the smallest bone in the human body?', answer: 'The smallest bone in the human body is the stapes bone in the middle ear.' },
            { question: 'What is the capital of Brazil?', answer: 'The capital of Brazil is Brasília.' },
            { question: 'What is the main ingredient in bread?', answer: 'The main ingredient in bread is flour.' },
            { question: 'What is the chemical symbol for water?', answer: 'The chemical symbol for water is H2O.' },
            { question: 'What is the capital of Italy?', answer: 'The capital of Italy is Rome.' },
            { question: 'What is the most expensive gemstone?', answer: 'The most expensive gemstone is the pink star diamond.' },
            { question: 'What is the capital of Russia?', answer: 'The capital of Russia is Moscow.' },
            { question: 'What is the most common blood type?', answer: 'The most common blood type is O positive.' },
            { question: 'What is the capital of China?', answer: 'The capital of China is Beijing.' },
            { question: 'What is the oldest known civilization?', answer: 'The oldest known civilization is the Sumerian civilization.' },
            { question: 'What is the largest island in the world?', answer: 'The largest island in the world is Greenland.' },
            { question: 'What is the capital of Egypt?', answer: 'The capital of Egypt is Cairo.' },
            { question: 'What is the hardest natural substance?', answer: 'The hardest natural substance is diamond.' },
            { question: 'What is the most populous city in the world?', answer: 'As of recent data, Tokyo, Japan is one of the most populous cities in the world.' },
            { question: 'What is the capital of Turkey?', answer: 'The capital of Turkey is Ankara.' },
            { question: 'What is the capital of Saudi Arabia?', answer: 'The capital of Saudi Arabia is Riyadh.' },
            { question: 'What is the most valuable company in the world?', answer: 'As of recent data, Apple is one of the most valuable companies in the world.' },
            { question: 'What is the capital of Sweden?', answer: 'The capital of Sweden is Stockholm.' },
            { question: 'What is the largest volcano in the world?', answer: 'The largest volcano in the world is Mauna Loa in Hawaii.' },
            { question: 'What is the capital of Norway?', answer: 'The capital of Norway is Oslo.' },
            { question: 'What is the capital of New Zealand?', answer: 'The capital of New Zealand is Wellington.' },
            { question: 'What is the longest word in the English language?', answer: 'The longest word in the English language is "pneumonoultramicroscopicsilicovolcanoconiosis".' },
            { question: 'What is the capital of Portugal?', answer: 'The capital of Portugal is Lisbon.' },
            { question: 'What is the smallest country by area?', answer: 'The smallest country by area is Vatican City.' },
            { question: 'What is the capital of Thailand?', answer: 'The capital of Thailand is Bangkok.' },
            { question: 'What is the most expensive metal?', answer: 'The most expensive metal is rhodium.' },
            { question: 'What is the capital of Argentina?', answer: 'The capital of Argentina is Buenos Aires.' },
            { question: 'What is the capital of Mexico?', answer: 'The capital of Mexico is Mexico City.' },
            { question: 'What is the capital of Greece?', answer: 'The capital of Greece is Athens.' },
            { question: 'What is the capital of South Korea?', answer: 'The capital of South Korea is Seoul.' },
            { question: 'What is the capital of South Africa?', answer: 'South Africa has three capitals: Pretoria (administrative), Bloemfontein (judicial), and Cape Town (legislative).' },
            { question: 'What is the largest continent?', answer: 'The largest continent is Asia.' },
            { question: 'What is the rarest blood type?', answer: 'The rarest blood type is AB negative.' },
            { question: 'What is the capital of India?', answer: 'The capital of India is New Delhi.' },
            { question: 'What is the capital of the United Kingdom?', answer: 'The capital of the United Kingdom is London.' },
            { question: 'What is the most common element in the universe?', answer: 'The most common element in the universe is hydrogen.' },
            { question: 'What is the strongest muscle in the human body?', answer: 'The strongest muscle in the human body, in terms of its size, is the masseter (jaw muscle).' },
            { question: 'What is the most expensive city to live in?', answer: 'As of recent data, cities like Hong Kong and New York City are among the most expensive to live in.' },
            { question: 'What is the largest organ in the human body?', answer: 'The largest organ in the human body is the skin.' },
            { question: 'What is the capital of Kenya?', answer: 'The capital of Kenya is Nairobi.' },
            { question: 'What is the largest star known?', answer: 'The largest star known is UY Scuti.' },
            { question: 'What is the most commonly used programming language?', answer: 'As of recent data, JavaScript is one of the most commonly used programming languages.' },
            { question: 'What is the capital of Denmark?', answer: 'The capital of Denmark is Copenhagen.' },
            { question: 'What is the most expensive painting ever sold?', answer: 'As of recent data, Leonardo da Vinci\'s "Salvator Mundi" is the most expensive painting ever sold.' },
            { question: 'What is the capital of the Netherlands?', answer: 'The capital of the Netherlands is Amsterdam.' },
            { question: 'What is the most widely spoken language in Africa?', answer: 'The most widely spoken language in Africa is Swahili.' },
            { question: 'What is the most common surname in the world?', answer: 'The most common surname in the world is "Li" or "Wang" in China.' },
            { question: 'What is the capital of Belgium?', answer: 'The capital of Belgium is Brussels.' },
            { question: 'What is the smallest mammal?', answer: 'The smallest mammal is the bumblebee bat.' },
            { question: 'What is the largest city by area?', answer: 'The largest city by area is New York City.' },
            { question: 'What is the most expensive spice?', answer: 'The most expensive spice is saffron.' },
            { question: 'What is the capital of Austria?', answer: 'The capital of Austria is Vienna.' },
            { question: 'What is the most common cause of death worldwide?', answer: 'The most common cause of death worldwide is heart disease.' },
            { question: 'What is the most popular sport in the world?', answer: 'The most popular sport in the world is soccer (football).' },
            { question: 'What is the capital of Hungary?', answer: 'The capital of Hungary is Budapest.' },
            { question: 'What is the most widely used search engine?', answer: 'The most widely used search engine is Google.' },
            { question: 'What is the largest freshwater lake by volume?', answer: 'The largest freshwater lake by volume is Lake Baikal.' },
            { question: 'What is the most commonly used social media platform?', answer: 'As of recent data, Facebook is one of the most commonly used social media platforms.' },
            { question: 'What is the capital of Chile?', answer: 'The capital of Chile is Santiago.' },
            { question: 'What is the most common pet in the world?', answer: 'The most common pet in the world is the dog.' },
            { question: 'What is the capital of Finland?', answer: 'The capital of Finland is Helsinki.' },
            { question: 'What is the most consumed beverage in the world?', answer: 'The most consumed beverage in the world is water.' },
            { question: 'What is the capital of the Philippines?', answer: 'The capital of the Philippines is Manila.' },
            { question: 'What is the most expensive food in the world?', answer: 'The most expensive food in the world is often considered to be caviar.' },
            { question: 'What is the capital of Pakistan?', answer: 'The capital of Pakistan is Islamabad.' },
            { question: 'What is the most common allergy?', answer: 'The most common allergy is pollen allergy (hay fever).' },
            { question: 'What is the capital of Switzerland?', answer: 'The capital of Switzerland is Bern.' },
            { question: 'What is the most common fear?', answer: 'The most common fear is public speaking.' },
            { question: 'What is the capital of Ireland?', answer: 'The capital of Ireland is Dublin.' },
            { question: 'What is the most common type of cancer?', answer: 'The most common type of cancer is skin cancer.' },
            { question: 'What is the capital of Malaysia?', answer: 'The capital of Malaysia is Kuala Lumpur.' },
            { question: 'What is the most common phobia?', answer: 'The most common phobia is arachnophobia (fear of spiders).' },
            { question: 'What is the capital of Romania?', answer: 'The capital of Romania is Bucharest.' },
            { question: 'What is the most common eye color?', answer: 'The most common eye color is brown.' },
            { question: 'What is the capital of Singapore?', answer: 'The capital of Singapore is Singapore.' },
            { question: 'What is the most common hair color?', answer: 'The most common hair color is black.' },
            { question: 'What is the capital of Ukraine?', answer: 'The capital of Ukraine is Kyiv.' },
            { question: 'What is the most common type of fracture?', answer: 'The most common type of fracture is a distal radius fracture (wrist).' },
            { question: 'What is the capital of Vietnam?', answer: 'The capital of Vietnam is Hanoi.' },
            { question: 'What is the most common blood type?', answer: 'The most common blood type is O positive.' },
            { question: 'What is the capital of Nigeria?', answer: 'The capital of Nigeria is Abuja.' },
            { question: 'What is the most common language in the world?', answer: 'The most common language in the world is English, with the most native speakers being Mandarin Chinese.' }
    ]);
        
    const [isTeachingMode, setIsTeachingMode] = useState<boolean>(false);
    const [normalChatBot, setnormalChatBot] = useState<boolean>(false);
([])
    // Animation for the menu
    const [menuVisible, setMenuVisible] = useState(false);
    const translateX = useState(new Animated.Value(-250))[0];

    useEffect(() => {
        // you can teach the chatbot or use the pregenerated responses
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
        // have a question in hsitory for chatbot to learn
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
        // set to pregenerated questions
        setRefresh(refresh + 1);  
        setnormalChatBot(true); 
        alert('You have selected Normal Chat mode.');
    };

    const userInputAI = () => {
        setRefresh(refresh + 1);  
        setnormalChatBot(false);
        alert('You have selected User Input AI mode.'); 
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