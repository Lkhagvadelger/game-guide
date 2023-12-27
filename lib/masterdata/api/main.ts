import { prisma } from "@api/prisma";

export const getMasterDataByValue = async (
  value: string
) => {
  return await prisma.masterData.findFirst({
    select: {
      id: true,
      name: true,
      value: true,
      countryId: true,
    },
    where: {
      value: value,
    },
  });


};
