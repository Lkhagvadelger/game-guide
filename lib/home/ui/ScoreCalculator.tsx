import { useLocalStorage } from "@ui/hooks/useLocalStorage";
import {
  Box,
  HStack,
  Text,
  Input,
  VStack,
  Button,
  Heading,
  ButtonGroup,
  Icon,
} from "@ui/index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMedal, FaMinus, FaPlus, FaTrophy } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";

export type ScorePlayerType = {
  player: number;
  name: string;
  game: [
    {
      gameNumber: number;
      point: number;
      isWinnder: boolean;
    }
  ];
  isInGame: boolean;
};
export const ScoreCalculator = () => {
  const defaultMaxPoint = 30;
  const initialScore = [
    {
      player: 1,
      name: "P1",
      isInGame: true,
      game: [],
    },
    {
      player: 2,
      name: "P2",
      isInGame: true,
      game: [],
    },
    {
      player: 3,
      name: "P3",
      isInGame: true,
      game: [],
    },
    {
      player: 4,
      name: "P4",
      isInGame: true,
      game: [
        // {
        //   gameNumber: 1,
        //   point: 0,
        //   isWinnder: false,
        // },
      ],
    },
  ];
  const [game, setGame] = useLocalStorage("players", {
    players: initialScore,
    totalPlayers: 4,
    maxPoint: 30,
    isLive: false,
  });

  const [totalPlayers, setTotalPlayers] = useState(4);
  const [maxPoint, setMaxPoint] = useState(30);
  useEffect(() => {
    setTotalPlayers(game.totalPlayers);
  }, [totalPlayers]);

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScorePlayerType[]>({
    defaultValues: game.players,
  });
  // input state change should update the local storage
  // there should be no submit or button
  // there should be reset button, add player and remove player button
  const removePlayer = (key: number) => {
    let players = game.players;
    players[key].isInGame = false;
    setGame({ ...game, players: players });
  };
  const addPlayer = (key: number) => {
    let players = game.players;
    players[key].isInGame = true;
    players[key].name = "P" + (key + 1);
    setGame({ ...game, players: players });
  };
  const startGame = () => {
    setGame({ ...game, isLive: true });
  };

  const clearAllGameHistory = () => {
    //keep old player names
    let players = game.players;
    players.forEach((player: any) => {
      player.game = [];
    });

    //reset the game
    setGame({ ...game, players: players, isLive: false });
  };
  const AddRemoveButton = ({
    index,
    isInGame,
  }: {
    index: number;
    isInGame: boolean;
  }) => {
    return game.isLive ? (
      <></>
    ) : isInGame ? (
      <Button
        size={"sm"}
        w="full"
        leftIcon={<FaMinus />}
        onClick={() => {
          removePlayer(index);
        }}
      >
        Remove
      </Button>
    ) : (
      <Button
        leftIcon={<FaPlus />}
        size={"sm"}
        w="full"
        onClick={() => {
          addPlayer(index);
        }}
      >
        Add
      </Button>
    );
  };
  const WinnerButton = ({ index }: { index: number }) => {
    return game.players[index].isInGame ? (
      <VStack w="full">
        {showSumOfPoints(index) >= 30 ? (
          <></>
        ) : (
          <Button
            w="full"
            onClick={() => {
              setWinner(index);
            }}
          >
            Winner
          </Button>
        )}
      </VStack>
    ) : (
      <VStack w="full"></VStack>
    );
  };
  const setWinner = (winnerIndex: number) => {
    let players = game.players;
    players[winnerIndex].game.push({
      gameNumber: players[winnerIndex].game.length + 1,
      point: 0,
      isWinnder: true,
    });
    players.forEach((player: any, index: number) => {
      if (index != winnerIndex) {
        player.game.push({
          gameNumber: player.game.length + 1,
          point: 0,
          isWinnder: false,
        });
      }
    });
    setGame({ ...game, players: players });
  };
  const changePlayerName = (playerIndex: number, name: string) => {
    let players = game.players;
    players[playerIndex].name = name;
    setGame({ ...game, players: players });
  };
  const setLoserPoint = (loserIndex: number, gameIndex: number, point: any) => {
    let players = game.players;
    if (isNumeric(point.target.value)) {
      players[loserIndex].game[gameIndex].point = Number(point.target.value);
    } else players[loserIndex].game[gameIndex].point = 0;

    setGame({ ...game, players: players });
  };
  const isNumeric = (str: any) => {
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseInt(str))
    ); // ...and ensure strings of whitespace fail
  };
  const showSumOfPoints = (playerIndex: number) => {
    let sum = 0;
    game.players[playerIndex].game.forEach((game: any) => {
      sum += game.point;
    });
    return sum;
  };

  return (
    <VStack
      p={4}
      fontSize={"10px"}
      w="full"
      pb={"88px"}
      bg="#fff"
      fontFamily={"sans-serif"}
      gap={2}
    >
      <Heading w="full" py="4" color="gray.800">
        Score board
        <Text as="span" fontSize={"md"} fontWeight={"400"} color="gray.600">
          {" "}
          (2-4 players)
        </Text>
      </Heading>
      <Text fontSize={"sm"} pb={2}>
        Please change the names(P1, P2) and click on "Start New Game" button
      </Text>
      <Text fontSize={"sm"}>
        The last player who left with under {maxPoint} points will be winner.{" "}
      </Text>
      <HStack w="full" h={"32px"}>
        {game &&
          game.players &&
          game.players.map((player: ScorePlayerType, key: number) => {
            return (
              <>
                {key == 0 && (
                  <VStack key={"top-" + key} w="64px">
                    <Text></Text>
                  </VStack>
                )}
                <VStack key={key} w="full">
                  {(key == 2 || key == 3) && player.isInGame && (
                    <>
                      <AddRemoveButton index={key} isInGame={player.isInGame} />
                    </>
                  )}
                  {player.isInGame && game.isLive && (
                    <Text
                      fontSize={"md"}
                      color={
                        showSumOfPoints(key) >= 30 ? "red.600" : "gray.900"
                      }
                      fontWeight={showSumOfPoints(key) >= 30 ? "600" : "400"}
                    >
                      {showSumOfPoints(key)} / {maxPoint}
                    </Text>
                  )}
                </VStack>
              </>
            );
          })}
      </HStack>
      <VStack w="full">
        <HStack w="full">
          {game &&
            game.players &&
            game.players.map((player: ScorePlayerType, key: number) => {
              return (
                <>
                  {key == 0 && (
                    <VStack key={"0" + key} w="64px">
                      <Text>#</Text>
                    </VStack>
                  )}
                  <VStack key={key} w="full">
                    {player.isInGame ? (
                      <Input
                        maxLength={8}
                        type="text"
                        value={player.name}
                        onChange={(e) => {
                          changePlayerName(key, e.target.value);
                        }}
                      />
                    ) : (
                      <AddRemoveButton index={key} isInGame={player.isInGame} />
                    )}
                  </VStack>
                </>
              );
            })}
        </HStack>
        <HStack w="full">
          {game &&
            game.players &&
            game.players.map((player: ScorePlayerType, key: number) => {
              return (
                <>
                  {key == 0 && (
                    <VStack w="64px">
                      {player.game.map((game: any, gameIndex: number) => {
                        return (
                          <Box h={10}>
                            <Text fontSize={"12px"}>{gameIndex + 1}</Text>
                          </Box>
                        );
                      })}
                    </VStack>
                  )}
                  {player.isInGame ? (
                    <VStack key={key} w="full">
                      {player.game.map((game: any, gameIndex: number) => {
                        return (
                          <Box w="full" h={10} key={gameIndex}>
                            {game.isWinnder ? (
                              <Text
                                key={key}
                                textAlign={"center"}
                                fontSize={"24px"}
                                lineHeight={"48px"}
                                w="full"
                                color="yellow.400"
                              >
                                <Icon as={FaTrophy} />
                              </Text>
                            ) : (
                              <Input
                                key={key}
                                maxLength={8}
                                type="text"
                                value={game.point}
                                onChange={(e) => {
                                  setLoserPoint(key, gameIndex, e);
                                }}
                              />
                            )}
                          </Box>
                        );
                      })}
                    </VStack>
                  ) : (
                    <Box w="full"></Box>
                  )}
                </>
              );
            })}
        </HStack>
        {game && game.isLive && (
          <HStack w="full">
            <VStack w="64px"></VStack>
            <WinnerButton index={0} />
            <WinnerButton index={1} />
            <WinnerButton index={2} />
            <WinnerButton index={3} />
          </HStack>
        )}
        <HStack w="full" py={2}>
          {game && game.isLive ? (
            <>
              <Button w="full" size="md" onClick={clearAllGameHistory}>
                Reset game
              </Button>
            </>
          ) : (
            <>
              <Text minWidth={"48px"}>Max point</Text>
              <Input
                size="xs"
                type="number"
                placeholder="Max point"
                value={maxPoint}
                onChange={(e) => {
                  setMaxPoint(Number(e.target.value));
                }}
              />
              <Button w="full" onClick={startGame}>
                {" "}
                Start New Game
              </Button>
            </>
          )}
        </HStack>
        {game && game.isLive && (
          <Text fontSize={"xs"}>
            To add new player your must reset the game
          </Text>
        )}
      </VStack>
    </VStack>
  );
};
