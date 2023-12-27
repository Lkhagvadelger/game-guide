import { prisma } from "@api/prisma";

export const getCountry = async (countryCode: any) => {
  const data = await prisma.country.findFirst({
    where: {
      countryCode: {
        equals: countryCode,
        mode: "insensitive",
      },
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      languageName: true,
    },
  });

  return data;
};
