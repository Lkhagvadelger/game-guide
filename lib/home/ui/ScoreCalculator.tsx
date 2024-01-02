import { useLocalStorage } from "@ui/hooks/useLocalStorage";
import { Box, HStack, Text, Input, VStack, Button, Heading } from "@ui/index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    setGame({ ...game, players: players });
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
        Score calculation
      </Heading>
      <Text fontSize={"md"}>
        The last player who left with under {maxPoint} points will be winner.{" "}
      </Text>
      <HStack w="full">
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
                  {key == 2 &&
                    (player.isInGame ? (
                      <Button
                        w="full"
                        onClick={() => {
                          removePlayer(key);
                        }}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant={"outline"}
                        w="full"
                        onClick={() => {
                          addPlayer(key);
                        }}
                      >
                        Add
                      </Button>
                    ))}
                  {key == 3 &&
                    (player.isInGame ? (
                      <Button
                        w="full"
                        onClick={() => {
                          removePlayer(key);
                        }}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        w="full"
                        onClick={() => {
                          addPlayer(key);
                        }}
                      >
                        Add
                      </Button>
                    ))}
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
                    <VStack w="64px">
                      <Text>#</Text>
                    </VStack>
                  )}
                  <VStack key={key} w="full">
                    <Input
                      maxLength={8}
                      type="text"
                      defaultValue={player.name}
                      {...register(player.name as any)}
                    />
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
                      <Text></Text>
                    </VStack>
                  )}
                  <VStack key={key} w="full"></VStack>
                </>
              );
            })}
        </HStack>
        {game && game.isLive && (
          <HStack w="full">
            <VStack w="64px"></VStack>
            <VStack w="full">
              <Button w="full"> Winner</Button>
            </VStack>
            <VStack w="full">
              <Button w="full"> Winner</Button>
            </VStack>
            <VStack w="full">
              {game && game.players[2].isInGame && (
                <Button w="full"> Winner</Button>
              )}
            </VStack>
            <VStack w="full">
              {game && game.players[3].isInGame && (
                <Button w="full"> Winner</Button>
              )}
            </VStack>
          </HStack>
        )}
        <HStack w="full" py={2}>
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
          <Button w="full"> Start new game</Button>
        </HStack>
      </VStack>
    </VStack>
  );
};
