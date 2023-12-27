import { prisma } from "@api/prisma";





export const getMainCategory = async (countryId: string) => {
  return await prisma.categoryMain.findMany({
    where: {
      countryId,
    },
  });
};
const defaultSelect = {
  id: true,
  name: true,
  sortIndex: true,
  filterCategory: true,
  media: true,
  totalCount: true,
}

export const getCategory = async (countryId: string) => {
  return await prisma.category.findMany({
    where: {
      countryId,
      isActive: true,
      parentCategoryId: null,
    },
    select: { //lvl1
      ...defaultSelect,
      children: {
        select: { //lvl2
          ...defaultSelect,
          children: {
            select: { //lvl3
              ...defaultSelect,
              children: {
                select: { //lvl4
                  ...defaultSelect,
                  children: {
                    select: { //lvl5
                      ...defaultSelect,
                      children: {
                        select: { //lvl6
                          ...defaultSelect,
                          children: {
                            select: { //lvl7
                              ...defaultSelect,
                              children: {
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      sortIndex: "asc",
    }
  });
};
