translate(-1,'X').
translate(0,' ').
translate(1,'G').
translate(2,'R').

color(-1, magenta).
color(0, white).
color(1, green).
color(2, red).

print_char(C):-
    translate(C,X),
    color(C, A),
    ansi_format([bold, fg(A)], '~w', [X]),
    write(' | ').

print_line([]) :- nl.
print_line([C|T]):-
    print_char(C),
    print_line(T).
    
print_separator([]) :-
    write('-').
print_separator([_|L]):-
    write('----'),
    print_separator(L).

print_board([], _).
print_board([L|T], N):-
    write(' '), write(N),
    write('   | '),
    print_line(L),
    write('-----'),
    print_separator(L),
    nl,
    N1 is N + 1,
    print_board(T, N1).
print_board(B):-
    print_board(B, 1).

printBlank([]).
printBlank([_|R]):-
    write('   |'),
    printBlank(R).

printXCoords([], _).
printXCoords([_|R], N):-
    write(N),
    write(' | '),
    N1 is N+1,
    printXCoords(R, N1).
printXCoords(R) :-
    printXCoords(R, 1), nl,
    write(' Y   |'),
    printBlank(R).

display_game([L|Board]):-
    write('   X | '),
    printXCoords(L), nl,
    write('-----'),
    print_separator(L),
    nl,
    print_board([L|Board]).
