:- ensure_loaded('matrix_util.pl').
%%%%%%%%%%%%%%%%%%%%%
%return true if the cell is empty
%is_empty_cell(+Board, +Coordinates)
is_empty_cell(Board,[X,Y]):-
    cell(Board,X,Y,V),
    V =:= 0.

is_empty_cell(Board,[X,Y]):-
    cell(Board,X,Y,V),
    V =:= -1.
%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%
%return true if it if from the source coordinates(Xs,Ys) you can reach the dest coordinates(Xd,Yd)
%valid_dest(+Coordinates)
valid_dest([Xs,Ys,Xd,Yd]):-
    abs(Xd-Xs) =:= 2,
    abs(Yd-Ys) =:= 0.


valid_dest([Xs,Ys,Xd,Yd]):-
    abs(Xd-Xs) =:= 0,
    abs(Yd-Ys) =:= 2.

valid_dest([Xs,Ys,Xd,Yd]):-
    abs(Xd-Xs) =:= 2,
    abs(Yd-Ys) =:= 2.


%%%%%%%%%%%%%%%%%%%%
%returns true if the Coordinates are withing board limits
%valid_coordinates(+Coordinates)
valid_coordinates([X,Y]):-
    X >0,
    Y >0,
    X =< 8,
    Y =< 8.

%%%%%%%%%%%%%%%%%%%%
%returns true if the move is valid
%valid_move(+Player,+Board,Coordinates)
valid_move(1,Board,[Xs,Ys,Xd,Yd]):-
    cell(Board,Xs,Ys,V),
    V == 1,
    is_empty_cell(Board,[Xd,Yd]),
    Xm is (Xd+Xs)//2,
    Ym is (Yd+Ys)//2,
    \+is_empty_cell(Board,[Xm,Ym]),        
    valid_coordinates([Xs,Ys]),
    valid_coordinates([Xd,Yd]),
    valid_dest([Xs,Ys,Xd,Yd]).

valid_move(2,Board,[Xs,Ys,Xd,Yd]):-
    cell(Board,Xs,Ys,V),
    V == 2,
    is_empty_cell(Board,[Xd,Yd]),
    Xm is (Xd+Xs)//2,
    Ym is (Yd+Ys)//2,
    \+is_empty_cell(Board,[Xm,Ym]),  
    valid_coordinates([Xs,Ys]),
    valid_coordinates([Xd,Yd]),
    valid_dest([Xs,Ys,Xd,Yd]).



%moves a piece in the board
%move(+Board,+Player,+Coordinates,-NewBoard)
move(Board,Player,[Xs,Ys,Xd,Yd],Outcome):-
    valid_move(Player,Board,[Xs,Ys,Xd,Yd]),
    change_cell(Board,Xs,Ys,0,O1),
    change_cell(O1,Xd,Yd,Player,O2),
    Xm is (Xd+Xs)//2,
    Ym is (Yd+Ys)//2,
    change_cell(O2,Xm,Ym,0,Outcome).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



%list all moves 
% valid_moves(+Board, +Player, -ListOfMoves)
valid_moves(Board,Player,ListOfMoves):-
    findall([Xs,Ys,Xd,Yd],valid_move(Player,Board,[Xs,Ys,Xd,Yd]),ListOfMoves).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% checks if the game is over(there are no more possible moves for a player)
% game_over(+Board,+Player,+OtherPalyer,-Winner)
%
% Called at the beggining of every Player's turn
% OtherPlayer is the opponent
game_over(Board, Player, OtherPlayer, Player):-
    % Player wins if OtherPlayer has no more frogs
    findall([X,Y], (nth1(Y, Board, R), nth1(X, R, OtherPlayer)), []).
game_over(Board, Player, OtherPlayer, OtherPlayer):-
    % OtherPlayer win if Player can't move anymore frogs.
    valid_moves(Board,Player,[]).

    

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%value(+Board, +Player, -Value).
value(Board,Player,Value):-
    valid_moves(Board,Player,ListOfMoves),
    length(ListOfMoves,N),
    Value is N.



isRowComplete([]).
isRowComplete([C|R]):-
    C =\= 0,
    isRowComplete(R).
% Check if board is completely finished building
isBoardComplete([]).
isBoardComplete([R|B]):-
    isRowComplete(R),
    isBoardComplete(B).

% checkSwamp(Board, X, Y, Width, Height, ResulBoard).
% checks if Position (X,Y) in Board is a swamp area.
% if it is, sets it to -1. Used at the end of player turns to
% remove the piece they moved if it ended up in the swamp
checkSwamp(Board, X, Y, _, _, ResultBoard):-
    X =:= 1,
    change_cell(Board, X, Y, -1, ResultBoard).
checkSwamp(Board, X, Y, Width, _, ResultBoard):-
    X =:= Width,
    change_cell(Board, X, Y, -1, ResultBoard).
checkSwamp(Board, X, Y, _, _, ResultBoard):-
    Y =:= 1,
    change_cell(Board, X, Y, -1, ResultBoard).
checkSwamp(Board, X, Y, _, Height, ResultBoard):-
    Y =:= Height,
    change_cell(Board, X, Y, -1, ResultBoard).
checkSwamp(Board, _, _, _, _, Board).
