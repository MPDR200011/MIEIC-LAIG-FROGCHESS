:- use_module(library(random)).
:- use_module(library(system)).
:- ensure_loaded('ai.pl').
:- ensure_loaded('game_logic.pl').

% Checks if coordinates (X,Y) in Board
% represent a valid cell to place a frog piece.
% In other words, a cell set to 0.
validateEmptyCoords(Board, X, Y) :-
    cell(Board, X, Y, V),
    V =:= 0.

% Checks whether given cell coords in a Boar hold a piece of the specified Player
validatePlayerCoords(Board, X, Y, Player) :-
    cell(Board, X, Y, V),
    write(V), nl,
    V =:= Player.

% Checks wether the cell at coords X,Y in the Board,
% which belongs to the Player, can be used for any move.
checkPossibility(Board, Player, X, Y) :-
    findall([Xf, Yf], valid_move(Player, Board, [X, Y, Xf, Yf]), ValidMoves),
    length(ValidMoves, L),
    L > 0.