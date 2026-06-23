# ZigZag Conversion

## Problem Statement

Given a string `s` and an integer `numRows`, write the string in a zigzag pattern across the given number of rows and then read the pattern row by row.

### Example

**Input**

```text
s = "PAYPALISHIRING"
numRows = 3
```

**ZigZag Pattern**

```text
P   A   H   N
A P L S I I G
Y   I   R
```

**Output**

```text
PAHNAPLSIIGYIR
```

---

## Approach

Instead of building a complete 2D matrix, maintain an array where each element represents a row in the zigzag pattern.

### Steps

1. Create `numRows` empty strings.
2. Traverse each character of the input string.
3. Append the character to the current row.
4. Change direction when reaching the first or last row.
5. Concatenate all rows to form the final result.

---

## Algorithm

1. If `numRows` is 1 or greater than/equal to the string length, return the original string.
2. Initialize an array of empty strings for each row.
3. Use:

   * `current_row` to track the current row.
   * `direction` to control upward/downward movement.
4. Add each character to its respective row.
5. Join all rows and return the result.

---

## Python Implementation

```python
def convert(s, numRows):
    if numRows == 1 or numRows >= len(s):
        return s

    rows = [""] * numRows
    current_row = 0
    direction = -1

    for char in s:
        rows[current_row] += char

        if current_row == 0 or current_row == numRows - 1:
            direction *= -1

        current_row += direction

    return "".join(rows)


s = "PAYPALISHIRING"
numRows = 3
print(convert(s, numRows))
```

---

## Dry Run

### Input

```text
s = "PAYPALISHIRING"
numRows = 3
```

### Row Construction

| Character | Current Row | Rows State                 |
| --------- | ----------- | -------------------------- |
| P         | 0           | ["P", "", ""]              |
| A         | 1           | ["P", "A", ""]             |
| Y         | 2           | ["P", "A", "Y"]            |
| P         | 1           | ["P", "AP", "Y"]           |
| A         | 0           | ["PA", "AP", "Y"]          |
| L         | 1           | ["PA", "APL", "Y"]         |
| I         | 2           | ["PA", "APL", "YI"]        |
| S         | 1           | ["PA", "APLS", "YI"]       |
| H         | 0           | ["PAH", "APLS", "YI"]      |
| I         | 1           | ["PAH", "APLSI", "YI"]     |
| R         | 2           | ["PAH", "APLSI", "YIR"]    |
| I         | 1           | ["PAH", "APLSII", "YIR"]   |
| N         | 0           | ["PAHN", "APLSII", "YIR"]  |
| G         | 1           | ["PAHN", "APLSIIG", "YIR"] |

### Final Rows

```text
Row 0: PAHN
Row 1: APLSIIG
Row 2: YIR
```

### Result

```text
PAHNAPLSIIGYIR
```

---

## Complexity Analysis

### Time Complexity

```text
O(n)
```

Each character is processed exactly once.

### Space Complexity

```text
O(n)
```

Additional space is used to store the rows.

---

## Edge Cases

### Example 1

```text
Input:
s = "ABC"
numRows = 1

Output:
ABC
```

### Example 2

```text
Input:
s = "AB"
numRows = 5

Output:
AB
```

---

## Key Insight

The zigzag traversal alternates between:

* Moving downward through the rows.
* Moving upward diagonally back to the top.

By tracking the current row and direction, the zigzag pattern can be simulated efficiently without creating a full matrix.
