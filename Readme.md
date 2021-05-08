## Task 1. Caesar cipher CLI tool

to start please write **node my_caesar_cli** and 4 options
CLI tool should accept 4 options (short alias or full name):

1.  **-s, --shift**: a shift (positive integer)
2.  **-i, --input**: an input file (input.txt)
3.  **-o, --output**: an output file (output.txt)
4.  **-a, --action**: an action (encode/decode)

**Details:**

1. Action (encode/decode) and the shift are required.
3. If the input file is missed - use stdin as an input source.
4. If the output file is missed - use stdout as an output destination.
5. If the input and/or output file is given but doesn't exist or System can't read it (e.g. because of permissions or it is a directory) - error.

**Usage example:**

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

