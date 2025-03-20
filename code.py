import pandas as pd
import json
import difflib

def find_copied_codes(df, similarity_threshold=0.95):
    num_codes = len(df)
    
    # Initialize all_codes with default values
    all_codes = [
        {
            'Name': df.iloc[i]['Name'],
            'Status': df.iloc[i]['Status'],
            'Code': df.iloc[i]['Code'],
            'copy': 'not copied'
        } for i in range(num_codes)
    ]

    for i in range(num_codes):
        code_i = df.iloc[i]['Code']
        
        for j in range(i + 1, num_codes):
            try:
                code_j = df.iloc[j]['Code']
                similarity = calculate_similarity(code_i, code_j)

                if similarity >= similarity_threshold:
                    all_codes[i]['copy'] = f'copied from {all_codes[j]["Name"]}'
                    all_codes[j]['copy'] = f'copied from {all_codes[i]["Name"]}'

            except Exception as e:
                print(f"Error processing row {i} and {j}: {e}")

    # Save to JSON
    with open('all_codes.json', 'w') as f:
        json.dump(all_codes, f, indent=5)

    return all_codes

try:
    df = pd.read_csv('codes.csv')
    df = df[::-1]  # Reverse order
    df = df[~df['Name'].str.lower().isin(['name'])]  # Remove invalid rows

    def tokenize_code(code):
        return code.split()

    def calculate_similarity(code1, code2):
        tokens1 = tokenize_code(code1)
        tokens2 = tokenize_code(code2)
        matcher = difflib.SequenceMatcher(None, tokens1, tokens2)
        return matcher.ratio()

    all_codes = find_copied_codes(df, similarity_threshold=0.95)

except pd.errors.ParserError as pe:
    print(f"ParserError: {pe}")
except Exception as e:
    print(f"Error: {e}")
