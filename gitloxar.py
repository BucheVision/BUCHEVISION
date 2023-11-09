import random

class Player:
    def __init__(self, name):
        self.name = name
        self.health = 100
        self.score = 0

    def display_status(self):
        print(f"{self.name}'s Status - Health: {self.health} | Score: {self.score}")

class Monster:
    def __init__(self, name, health, damage):
        self.name = name
        self.health = health
        self.damage = damage

    def attack(self, player):
        damage = random.randint(1, self.damage)
        player.health -= damage
        print(f"{self.name} attacks {player.name} for {damage} damage.")

def trivia_question():
    questions = {
        "What is the capital of France?": "Paris",
        "Which planet is known as the Red Planet?": "Mars",
        "What is the largest mammal in the world?": "Blue whale",
        # Add more questions and answers
    }
    question, answer = random.choice(list(questions.items()))
    user_answer = input(f"Trivia Question: {question}\nYour Answer: ").capitalize()
    return user_answer == answer

def main():
    print("Welcome to the RPG Trivia Game!")
    player_name = input("Enter your name: ")
    player = Player(player_name)

    while player.health > 0:
        player.display_status()

        # Randomly choose between a monster encounter or trivia question
        if random.choice([True, False]):
            monster = Monster("Orc", 30, 10)
            print(f"\nOh no! You encounter a {monster.name}!")
            monster.attack(player)
        else:
            if trivia_question():
                print("Correct! You gained 10 points.")
                player.score += 10
            else:
                print("Incorrect! You lose 20 health.")
                player.health -= 20

        input("\nPress Enter to continue...")

    print(f"\nGame over, {player.name}! Your final score is {player.score}.")

if __name__ == "__main__":
    main()
