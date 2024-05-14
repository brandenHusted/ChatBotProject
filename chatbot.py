
"""this is a program that reverses a linked list"""

"""class ListNode:
    def __init__(self, val = 0, next = None):
        self.val = val
        self.next = next

    def reverse(head):
        prev = None
        current = head
        while current is not None:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        return prev"""

"""this is a chatbot program """

import json
from difflib import get_close_matches

def load_knowledge_base(file_path: str) -> dict:
    with open(file_path, 'r') as file:
        data: dict = json.load(file)
    return data

def save_knowledge(file_path: str, data: dict):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent = 2)

def find_best_match(user_question: str, questions: list[str]) -> str | None:
    matches: list = get_close_matches(user_question, questions, n=1, cutoff=0.0)
    return matches[0] if matches else None

def get_answer_for_question(question: str, knowledge_base: dict) -> str | None:
    for i in knowledge_base["questions"]:
        if i["question"] == question:
            return i["answer"]

def main():
    knowledge_base = load_knowledge_base("questions.json")
    while True:
        user_input: str = input("You: ")

        if user_input.lower() == 'quit':
            break

        best_match: str | None = find_best_match(user_input, [i["question"] for i in knowledge_base["questions"]])
        if best_match:
            answer: str = get_answer_for_question(best_match, knowledge_base)
            print(f'Bot: {answer}')
        else:
            print('Bot: I do not know the answer. Can you teach me?')
            new_answer : str = input('You: ')
            if new_answer.lower() != 'skip':
                knowledge_base['questions'].append({'question': user_input, "answer": new_answer})
                save_knowledge('questions.json', knowledge_base)
                print('Bot: Thank you! I learned a new response.')

if __name__ == '__main__':
    main()


    
    
        