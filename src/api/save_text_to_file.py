def save_text_to_file(text):
    with open('text_data.txt', 'a') as file:  # Open file in append mode
        file.write(text + '\n')  # Write text followed by a newline

