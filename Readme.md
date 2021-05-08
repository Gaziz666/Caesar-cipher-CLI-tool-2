## Task 1. Caesar cipher CLI tool

**Install:**

1. git clone https://github.com/Gaziz666/Caesar-cipher-CLI-tool-2.git from develop branch
2. npm install

to start please write **node src/index** and 4 options
CLI tool should accept 4 options (short alias or full name):

1.  **-s, --shift**: a shift (positive integer)
2.  **-i, --input**: an input file (input.txt)
3.  **-o, --output**: an output file (output.txt)
4.  **-a, --action**: an action (encode/decode)

**Details:**

1. Action (encode/decode) and the shift are required.
2. If the input file is missed - use stdin as an input source.
3. If the output file is missed - use stdout as an output destination.
4. If the input and/or output file is given but doesn't exist or System can't read it (e.g. because of permissions or it is a directory) - error.

**Usage example:**

```bash
$ node src/index -a encode -s 7 -i "./input.txt" -o "./result.txt"
```

```bash
$ node src/index --action encode --shift 7 --input input.txt --output result.txt
```

```bash
$ node src/index --action decode --shift 7 --input input.txt --output result.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
