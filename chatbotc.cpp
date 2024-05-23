
#include <iostream>
#include <string>
#include <cstring>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

// Function to send a message to the server
void sendMessage(int sock, const std::string& message) {
    send(sock, message.c_str(), message.size(), 0);
}

// Function to receive a message from the server
std::string receiveMessage(int sock) {
    char buffer[1024] = {0};
    int valread = read(sock, buffer, 1024);
    return std::string(buffer, valread);
}

int main() {
    int sock = 0;
    struct sockaddr_in serv_addr;

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        std::cerr << "Socket creation error" << std::endl;
        return -1;
    }

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(65432);

    // Convert IPv4 and IPv6 addresses from text to binary form
    if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
        std::cerr << "Invalid address/ Address not supported" << std::endl;
        return -1;
    }

    // Connect to server
    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) < 0) {
        std::cerr << "Connection Failed" << std::endl;
        return -1;
    }

    std::string user_input;
    std::string response;

    while (true) {
        std::cout << "You: ";
        std::getline(std::cin, user_input);

        // Send user input to server
        sendMessage(sock, user_input);

        // Receive response from server
        response = receiveMessage(sock);
        std::cout << "Bot: " << response << std::endl;

        // Check if the bot asks for an answer
        if (response == "I do not know the answer. Can you teach me, human?") {
            std::cout << "You: ";
            std::getline(std::cin, user_input);
            
            // Send user's response to server
            sendMessage(sock, user_input);
            
            // Receive confirmation message from server
            response = receiveMessage(sock);
            std::cout << "Bot: " << response << std::endl;
        }
    }

    // Close socket
    close(sock);
    return 0;
}
