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
      name: "Player 1",
      isInGame: true,
      game: [],
    },
    {
      player: 2,
      name: "Player 2",
      isInGame: true,
      game: [],
    },
    {
      player: 3,
      name: "Player 3",
      isInGame: true,
      game: [],
    },
    {
      player: 4,
      name: "Player 4",
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
      <HStack w="full">
        {game &&
          game.players &&
          game.players.map((player: ScorePlayerType, key: number) => {
            return (
              <>
                {key == 0 && (
                  <VStack key={key} w="64px">
                    <Text>#</Text>
                  </VStack>
                )}
                <VStack key={key} w="full">
                  {(key == 2 || key == 3) && (
                    <Button w="full">
                      {player.isInGame ? <Text>Remove</Text> : <Text>Add</Text>}
                    </Button>
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
                    <VStack key={key} w="64px">
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
                    <VStack key={key} w="64px">
                      <Text>#</Text>
                    </VStack>
                  )}
                  <VStack key={key} w="full"></VStack>
                </>
              );
            })}
        </HStack>
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
        <HStack w="full" py={2}>
          <Text minWidth={"48px"}>Max point</Text>
          <Input size="xs" type="number" />
          <Button w="full"> Start game</Button>
        </HStack>
      </VStack>
    </VStack>
  );
};
