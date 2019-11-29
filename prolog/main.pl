:- use_module(library(random)).
:- use_module(library(system)).
:- ensure_loaded('ai.pl').
:- ensure_loaded('display_sicstus.pl').
:- ensure_loaded('game_logic.pl').

defaultBoard(
    [
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,0,0,0,0,0,0,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1]
    ]
).

% Predicate used to print player number followed by the chareacter that represents him.
% Frequently needed to display thee player and avoids repeating a lot of code.
display_player(Player) :-
    translate(Player, C),
    write('Player '), write(Player), write('('),
    write(C), write(')').

% Used to print the action a bot has taken.
documentPlayerMove(Player, Xi, Yi, Xf, Yf):-
    display_player(Player), write(' moved from '),
    write(Xi), write(','), write(Yi),
    write(' to '),
    write(Xf), write(','), write(Yf), nl.

% convertAndValidateCoord(+X, +Limit, -Coord)
% Receives a char in X, tries to convert it
% to and integer and verifies the constraint 1 <= X <= Limit.
convertAndValidateCoord(X, Limit, Coord) :-
    catch(number_chars(Coord, [X]), error(syntax_error(_),_), fail),
    Coord >= 1,
    Coord =< Limit.

% getCoord(-Coord, +Limit)
% Reads a single digit integer (Coord) from the terminal
% that respects the constraint 1 <= Coord <= Limit
getCoord(Coord, Limit) :-
    repeat,
    get_char(X),
    skip_line,
    (convertAndValidateCoord(X, Limit, Coord);
    (write('Invalid value, try again: '), fail)),!.

% readCoords(-X, -Y, +XLimit, +YLimit)
% Reads 2-dimensional positive coordinates from the terminal.
% These coordinates must not be higher than XLimit for X and Ylimit for Y.
readCoords(X, Y, XLimit, YLimit) :-
    write('Select X: '),
    getCoord(X, XLimit),
    write('Select Y: '),
    getCoord(Y, YLimit),!.

% Checks if coordinates (X,Y) in Board
% represent a valid cell to place a frog piece.
% In other words, a cell set to 0.
validateEmptyCoords(Board, X, Y) :-
    cell(Board, X, Y, V),
    V =:= 0.

% Reads, from the terminal, coordinates in the Board
% where you can place a piece. 
getEmptyCoords(Board, X, Y, XLimit, YLimit) :-
    repeat,
    readCoords(X, Y, XLimit, YLimit),
    (validateEmptyCoords(Board, X, Y);
    (write('Cell is already occupied, choose another one.'), nl, fail)),!.

% buildBoard(+Board, +Width, +Height, -ResultBoard, +Player, +NextPlayer, +PlayerKind, +NextPlayerKind)
% first "statement" of the buildBoard loop.
% basically acts as a base condition. If it is confirmed true
% the loop stops and the completed board is returned.
buildBoard(Board, _, _, Board, _, _, _, _) :-
    nl,nl,display_game(Board),nl,
    isBoardComplete(Board).
buildBoard(Board, Width, Height, ResultBoard, Player, NextPlayer, 'b1', NextPlayerKind) :-
    %Both kinds of bots have same building strategy.
    buildBoard(Board, Width, Height, ResultBoard, Player, NextPlayer, 'b', NextPlayerKind).
buildBoard(Board, Width, Height, ResultBoard, Player, NextPlayer, 'b', NextPlayerKind) :-
    % Get all empty slots.
    findall([X, Y], (nth1(Y, Board, R), nth1(X, R, 0)), Choices),
    length(Choices, N),
    N1 is N + 1,
    random(1, N1, I),
    %Get random empty cell
    nth1(I, Choices, [Xf, Yf]),
    display_player(Player), write(' (BOT) chose, coords: '),
    sleep(1),
    write(Xf), write(', '), write(Yf), nl, nl,
    % Place piece in board
    change_cell(Board, Xf, Yf, Player, B1),
    buildBoard(B1, Width, Height, ResultBoard, NextPlayer, Player, NextPlayerKind, 'b').
buildBoard(Board, Width, Height, ResultBoard, Player, NextPlayer, 'h', NextPlayerKind) :-
    display_player(Player), write(', select X Y coords to place frog. '),
    write('Must be between 1 and '), write(Width),
    write('.'), nl,
    % Get coords of empty cell in terminal
    getEmptyCoords(Board, X, Y, Width, Height),
    % Place piece in board
    change_cell(Board, X, Y, Player, B1),
    buildBoard(B1, Width, Height, ResultBoard, NextPlayer, Player, NextPlayerKind, 'h').

% Receives Board and returns ResultBoard, which is
% the Board with frog pieces in its empty cells.
% The pieces are placed one at a time alternating between both players
% so the number of pieces is equal to each player.
% K1 and K2 are the kind of player (human or bot)
buildBoard(Board, ResultBoard, K1, K2):-
    % retrieve board dimensions
    size(Board, Height, Width),
    % start building loop
    buildBoard(Board, Width, Height, ResultBoard, 1, 2, K1, K2).

% Checks whether given cell coords in a Boar hold a piece of the specified Player
validatePlayerCoords(Board, X, Y, Player) :-
    cell(Board, X, Y, V),
    write(V), nl,
    V =:= Player.

% Read, from the terminal, the coordinates of a Player's
% frog piece.
getPlayerCoords(Board, X, Y, XLimit, YLimit, Player) :-
    repeat,
    readCoords(X, Y, XLimit, YLimit),
    (validatePlayerCoords(Board, X, Y, Player);
    (write('The coords are not the location of one of your pieces. Try again:'), nl, fail)),!.

% Checks wether the cell at coords X,Y in the Board,
% which belongs to the Player, can be used for any move.
checkPossibility(Board, Player, X, Y) :-
    findall([Xf, Yf], valid_move(Player, Board, [X, Y, Xf, Yf]), ValidMoves),
    length(ValidMoves, L),
    L > 0.

% Get the X,Y coordinates of a Players's frog piece
choosePiece(Board, Player, X, Y, Width, Height) :-
    repeat,
    getPlayerCoords(Board, X, Y, Width, Height, Player),
    (checkPossibility(Board, Player, X, Y);
    (write('That piece cannot move anywhere, choose another.'), nl, fail)),!.

% Get the coordinates of an empty cell
% different from getEmptyCoords as it has a different error message
% due to context.
getDestCoords(Board, X, Y, XLimit, YLimit) :-
    repeat,
    readCoords(X, Y, XLimit, YLimit),
    (is_empty_cell(Board, [X, Y]);
    (write('Invalid destination coords, choose another one.'), nl,fail)),!.

% doMove(+Board, +Player, +Width, +Height, +Xi, +Yi, -Xf, -Yf, -ResultBoard)
% Given the Player's frog piece coordinates Xi,Yi in the Board,
% reads from the terminal the coords Xf,Yf to which to move the piece,
% making sure it is a valid move and performing said move, returning the
% resulting board in ResultBoard.
doMove(Board, Player, Width, Height, Xi, Yi, Xf, Yf, ResultBoard) :-
    write('Choose dest coords.'), nl,
    repeat,
    getDestCoords(Board, Xf, Yf, Width, Height),
    (valid_move(Player, Board, [Xi, Yi, Xf, Yf]);
    (write('Move is not valid, try again:'), nl, fail)),!,
    move(Board, Player, [Xi, Yi, Xf, Yf], B1),
    checkSwamp(B1, Xi, Yi, Width, Height, ResultBoard).

validateContinueOption('y', 'y').
validateContinueOption('n', 'n').

askContinue(A) :-
    write('Continue your turn? (y/n) : '),
    repeat,
    get_char(C),
    skip_line,
    (validateContinueOption(C, A);
    (write('Invalid option, try again: '), fail)),!.

% makeMoves(+ContinueOption, +Board, +Player, +Width, +Height, +Xi, +Yi, -Xf, -Yf, -ResultBoard)
% makeMoves receivesa Board, the current Player,
% the Board dimensions, the coordinates of the piece to move and
% returns the coordinates where the piece was left at the end and the resulting board.
%
% The first argument indicates wether the player wishes to continue his turn. 
makeMoves('n', Board, _, _, _, Xi, Yi, Xi, Yi, Board). % Player doesn't wish to continue.
makeMoves('y', Board, Player, _, _, Xi, Yi, Xi, Yi, Board) :-
    % Check if player has any valid moves with the given piece.
    % If he doesn't, forcefully finish the turn.
    findall([Xf, Yf], valid_move(Player, Board, [Xi, Yi, Xf, Yf]), ValidMoves),
    length(ValidMoves, L),
    L =:= 0,
    write('Out of moves, ending round.'), nl.
makeMoves('y',Board, Player, Width, Height, Xi, Yi, Xf, Yf, ResultBoard) :-
    % make on jump with the piece
    doMove(Board, Player, Width, Height, Xi, Yi, X1, Y1, B1),
    display_game(B1),
    askContinue(A),
    write('Got answer: '), write(A), nl,
    % Player can chain jumps with the piece he chose, so we
    % recurse back into this predicate but supplying it with coordinates
    % of where the piece ended from the jump.
    makeMoves(A, B1, Player, Width, Height, X1, Y1, Xf, Yf, ResultBoard).

% makePlay(+Board, +Player, +Width, +Height, -ResultBoard)
makePlay(Board, Player, Width, Height, ResultBoard) :-
    write('Choose a piece.'), nl,
    % Choose a piece to move
    choosePiece(Board, Player, Xi, Yi, Width, Height),
    % create a chain of jumps
    makeMoves('y', Board, Player, Width, Height, Xi, Yi, Xf, Yf, B1),
    % check if frog piece ended in swamp, and delet it if it did.
    checkSwamp(B1, Xf, Yf, Width, Height, ResultBoard).

% playGame(+Board, +Player, +NextPlayer, +PlayerKind, +NextPlayerKind, +Width, +Height, -ResultBoard)
% Main game loop
% Each iteration of the predicate is a player's turn, except
% for predicate playGame(Board, ResultBoard, Player1Kind, Player2Kind),
% which is the loop's entry point.
playGame(Board, Player, NextPlayer, _, _, _, _, _) :-
    % check if game ended before starting the Player's turn
    nl,nl,display_game(Board),
    game_over(Board, Player, NextPlayer, Winner),
    nl,nl,display_player(Winner), write(' wins !!!!!').
playGame(Board, Player, NextPlayer, 'b', NextPlayerKind, Width, Height, ResultBoard) :-
    write('Player '), write(Player), write(' turn'), nl,
    choose_move(Board, 0, Player, [Xi, Yi, Xf, Yf]),
    move(Board, Player, [Xi, Yi, Xf, Yf], B1),
    documentPlayerMove(Player, Xi, Yi, Xf, Yf),
    checkSwamp(B1, Xf, Yf, Width, Height, B2),
    sleep(5),
    playGame(B2, NextPlayer, Player, NextPlayerKind, 'b', Width, Height, ResultBoard).
playGame(Board, Player, NextPlayer, 'b1', NextPlayerKind, Width, Height, ResultBoard) :-
    choose_move(Board, 1, Player, [Xi, Yi, Xf, Yf]),
    move(Board, Player, [Xi, Yi, Xf, Yf], B1),
    documentPlayerMove(Player, Xi, Yi, Xf, Yf),
    checkSwamp(B1, Xf, Yf, Width, Height, B2),
    sleep(5),
    playGame(B2, NextPlayer, Player, NextPlayerKind, 'b1', Width, Height, ResultBoard).
playGame(Board, Player, NextPlayer, 'h', NextPlayerKind, Width, Height, ResultBoard) :-
    display_player(Player), write(' turn'), nl,
    % play Player's turn
    makePlay(Board, Player, Width, Height, B1),
    % pass the turn to the other player
    playGame(B1, NextPlayer, Player, NextPlayerKind, 'h', Width, Height, ResultBoard).
playGame(Board, ResultBoard, Player1Kind, Player2Kind):-
    size(Board, Height, Width),
    playGame(Board, 1, 2, Player1Kind, Player2Kind, Width, Height, ResultBoard).

main_loop(InitialBoard, K1, K2) :-
    %start borad building loop
    buildBoard(InitialBoard, GameBoard, K1, K2),
    write('Board complete.'), nl,
    %start game loop
    playGame(GameBoard, ResultBoard, K1, K2),
    display_game(ResultBoard).

validateModeChoice('1').
validateModeChoice('2').
validateModeChoice('3').
validateModeChoice('4').

readModeChoice(M) :-
    repeat,
    get_char(M),
    skip_line,
    (validateModeChoice(M); (write('Invalid choice, try again: '), fail)),!.

readGameMode(M) :-
    write('Choose game mode:'),nl,nl,
    write(' 1- Player vs Player'), nl,
    write(' 2- Bot vs Player'), nl,
    write(' 3- Player vs Bot'), nl,
    write(' 4- Bot vs Bot'), nl, nl,

    readModeChoice(M).

validateBotDif('0').
validateBotDif('1').

getBotType('0', 'b').
getBotType('1', 'b1').

setBot(Player, B) :-
    write('Choose Player '), write(Player),
    write(' dificulty (0/1): '),
    repeat,
    get_char(C),
    skip_line,
    (validateBotDif(C); (write('Invalid choice, try again: '), fail)),!,
    getBotType(C, B).

setMode('1', 'h', 'h').
setMode('2', B, 'h') :-
    setBot(1, B).
setMode('3', 'h', B) :-
    setBot(2, B).
setMode('4', B1, B2) :-
    setBot(1, B1),
    setBot(2, B2).

% Starts the game
%  - asks for game mode
%  - sets up settings
%  - starts main game loop
play :-
    readGameMode(M),
    setMode(M, K1, K2),
    defaultBoard(B),
    main_loop(B, K1, K2).
