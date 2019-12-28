:- ensure_loaded('game_logic.pl').
:- use_module(library(random)).

%Creates list of size N with X in each position and saves it in Out
%Used to generate lists as arguments for the map predicates
%generateList(+X,+N,-Out).
generateList(_,0,[]).
generateList(X,N,[X|T]):-
    N1 is N-1,
    generateList(X,N1,T).

maplist(Pred, Xs, Ys, Zs, Ws) :-
	(   foreach(X,Xs),
	    foreach(Y,Ys),
        foreach(Z,Zs),
        foreach(W,Ws),
	    param(Pred)
	do  call(Pred, X, Y, Z, W)
	).


%max(+List,-Max)
%returns the max element of a list
max2([],X,X).
max2([H|T],Curr,M):-
    Z is max(H,Curr),
    max2(T,Z,M).
max2([X|L],M):-
    max2(L,X,M).
    

%choose_move(+Board,+Level,+Player,-Move)
%used to pick the next move by the cpu
%level 0 : random
%level 1 : heuristic

choose_move(Board,0,Player,Move):-
    valid_moves(Board,Player,ListOfMoves),
    random_select(Move,ListOfMoves,_).


choose_move(Board,1,Player,Move):-
    valid_moves(Board,Player,ListOfMoves),
    length(ListOfMoves,N),
    generateList(Board,N,BoardList),
    generateList(Player,N,PlayerList),
    maplist(move,BoardList,PlayerList,ListOfMoves,BoardsWithMoves),
    maplist(value,BoardsWithMoves,PlayerList, ValueList),
    max2(ValueList,Largest),
    nth1(Index,ValueList,Largest),
    nth1(Index, ListOfMoves, Move).