import pandas as pd
import json
import difflib
def find_copied_codes(df, similarity_threshold=0.95):
    all_codes = []
    num_codes = len(df)
    
    for i in range(num_codes):
        code_i = df.iloc[i]['Code']
        name_i = df.iloc[i]['Name']
        status_i = df.iloc[i]['Status']
        code_i_entry = {
            'Name': name_i,
            'Status': status_i,
            'Code': code_i,
            'copy': 'not copied'  # default value
        }
        all_codes.append(code_i_entry)
        
        for j in range(i+1, num_codes):
            try:
                code_j = df.iloc[j]['Code']
                similarity = calculate_similarity(code_i, code_j)
                
                if similarity >= similarity_threshold:
                    name_j = df.iloc[j]['Name']
                    status_j = df.iloc[j]['Status']
                    
                    # Mark code_i as copied
                    code_i_entry['copy'] = f'copied from {name_j}'
                    
                    # Mark code_j as copied (if not already marked)
                    if j < len(all_codes) and all_codes[j]['copy'] == 'not copied':
                        all_codes[j]['copy'] = f'copied from {name_i}'
                    else:
                        print(f"Warning: Index j={j} out of range for all_codes, num_codes={num_codes}")
            except Exception as e:
                print(f"Error processing row {i} and {j}: {e}")
    
    # Save all codes to JSON file
    json_data = json.dumps(all_codes, indent=5)
    with open('all_codes.json', 'w') as f:
        f.write(json_data)
    
    return all_codes

try:
    # Read CSV file into DataFrame
    df = pd.read_csv('codes.csv')
    df = df[::-1]
    # Remove rows with 'Name' or 'name' in 'Name' column
    df = df[~df['Name'].str.lower().isin(['name'])]
    def tokenize_code(code):
        return code.split()
    def calculate_similarity(code1, code2):
        tokens1 = tokenize_code(code1)
        tokens2 = tokenize_code(code2)
        matcher = difflib.SequenceMatcher(None, tokens1, tokens2)
        similarity_ratio = matcher.ratio()
        return similarity_ratio

    # Call function to find copied codes with similarity >= 95% and save to JSON
    all_codes = find_copied_codes(df, similarity_threshold=0.95)

    # Print the JSON data (optional)
    print(json.dumps(all_codes, indent=5))

except pd.errors.ParserError as pe:
    print(f"ParserError: {pe}")
except Exception as e:
    print(f"Error: {e}")
