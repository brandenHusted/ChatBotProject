"This is a chatbot program"
import json
from difflib import get_close_matches

# Function to load knowledge base from a JSON file
def load_knowledge_base(file_path: str) -> dict:
    try:
        with open(file_path, 'r') as file:
            data: dict = json.load(file)
        return data
    except FileNotFoundError:
        return {"questions": []}

# Function to save knowledge base to a JSON file
def save_knowledge(file_path: str, data: dict):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

# Function to find the best matching question
def find_best_match(user_question: str, questions: list[str]) -> str | None:
    matches: list = get_close_matches(user_question, questions, n=1, cutoff=0.6)
    return matches[0] if matches else None

# Function to get answer for a question from knowledge base
def get_answer_for_question(question: str, knowledge_base: dict) -> str | None:
    for i in knowledge_base["questions"]:
        if i["question"] == question:
            return i["answer"]
        
def chat_bot():
     # Load knowledge base from JSON file
    knowledge_base = load_knowledge_base("questions.json")

    while True:
        user_input: str = input("You: ")
        if user_input.lower() == 'quit':
            break
        # Find best match for user input
        best_match: str | None = find_best_match(user_input, [i["question"] for i in knowledge_base["questions"]])
        if best_match:
            answer: str = get_answer_for_question(best_match, knowledge_base)
            print(f'Bot: {answer}')
        else:
            # If no match found, prompt client to teach a new response
            response = 'I do not know the answer. Can you teach me, human?'
            print(response)
            new_answer: str = input('Type the answer or type skip to skip: ')

            if new_answer.lower() != 'skip':
                # If client provides new answer, update knowledge base
                        knowledge_base['questions'].append({'question': user_input, 'answer': new_answer})
                        save_knowledge('questions.json', knowledge_base)
                        print('Bot: Thank you! I learned a new response.')


# Entry point of the script
if __name__ == '__main__':
    chat_bot()
