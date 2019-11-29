:- use_module(library(lists)).

%Length of a list, switched aruments so it can be used in a maplist function
length_of(N, Ls) :-
    length(Ls, N).

% Given a matrix Mss, returns number of rows R and columns C
size(Mss, R, C) :-
    length(Mss, R),
    maplist(length_of(C), Mss).

%! check_square(+M)
%Return true if matrix M is square
check_square(M) :-
    size(M, R, C),
    R =:= C.

%! cell(M, X, Y, V)
%Returns true if cell of coords X, Y of matrix M has value V
cell(M, X, Y, V):-
    nth1(Y, M, R),
    nth1(X, R, V).

%! change_col(+R, +Y, +V, -Or)
% Change element at position Y of list R to
% value V and put modified list in Or
change_col([_|R], 1, V, [V|R]).
change_col([C|R], X, V, [C|Or]):-
    X > 1,
    X1 is X- 1,
    change_col(R, X1, V, Or).

%! change_cell(M, X, Y, V, Om)
% Change element at coords X,Y of matrix M to
% value V and put modified matrix in Om
change_cell([R|M], X, 1, V, [N|M]):-
    change_col(R, X, V, N).
change_cell([R|M], X, Y, V, [R|Om]) :-
    Y > 1,
    Y1 is Y -1,
    change_cell(M, X, Y1, V, Om).
