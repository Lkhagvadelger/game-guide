import { prisma } from "@api/prisma";
import { getMasterDataByValue } from "@lib/masterdata/api/main";

export const getPromos = async (countryId: string) => {
  if (countryId) {
    const typeHome = await getMasterDataByValue("home_banner");

    if (typeHome) {
      console.log(typeHome, "--ty[e");
      const homePromo = await prisma.promos.findMany({
        select: {
          id: true,
          type: true,
          categoryMainId: true,
          media: true,
        },
        where: {
          countryId: countryId,
          isActive: true,
          typeMasterId: typeHome.id,
        },
      });

      const otherPromo = await prisma.promos.findMany({
        select: {
          id: true,
          type: true,
          categoryMain: true,
          categoryMainId: true,
          media: true,
        },
        where: {
          countryId: countryId,
          isActive: true,
          typeMasterId: {
            notIn: typeHome.id,
          },
        },
      });

      return {
        promo_home: homePromo,
        promo_other: otherPromo,
      };
    }
    return null;
  } else {
    console.log("promo null");
    return null;
  }
};
