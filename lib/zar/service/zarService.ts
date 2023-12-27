import { prisma } from "@api/prisma";
import { getMasterDataByValue } from "@lib/masterdata/api/main";
import { Prisma, UserRole } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { QueryParamType } from "@ui/hooks/query-param";
import { compare, hash } from "bcryptjs";

const defaultSelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  categoryId: true,
  categoryIds: true,
  media: true,
  createdAt: true,
  createdBy: true,
  countryId: true,
};
export type zarSelectType = {
  id: string;
  title: string;
  description: string | null;
  price: Decimal | any;
  categoryId: string;
  categoryIds: string[];
  media: any;
  createdAt: Date;
  createdBy: string;
  countryId: string;
};
export const createZar = async (
  zarBody: any,
  countryId: string,
  userId: string
) => {
  const status = await getMasterDataByValue("Шалгагдаж байгаа");

  return await prisma.zar.create({
    data: {
      title: zarBody.title,
      description: zarBody.description,
      categoryId: zarBody.categoryId,
      categoryIds: zarBody.categoryIds,
      categoryFieldData: zarBody.categoryFieldData,
      location: zarBody.location,
      media: zarBody.media,
      price: new Prisma.Decimal(zarBody.price),
      compareAtPrice: new Prisma.Decimal(zarBody.compareAtPrice == undefined ? 0 : zarBody.compareAtPrice),
      isFlexiblePrice: Boolean(zarBody.isFlexiblePrice),
      statusMasterId: status?.id,
      createdAt: new Date(),
      createdBy: userId,
      countryId: countryId,
    },
  });
};

export const getZarList = async (categoryId: string) => {
  const a: zarSelectType[] = await prisma.zar.findMany({
    where: {
      categoryIds: { hasEvery: categoryId },
    },
    select: defaultSelect,
  });
  return a.map((item) => {
    return {
      ...item,
      price: item.price * 1,
    };
  });
};

export const getZarById = async (id: string) => {
  const a: any = await prisma.zar.findUnique({
    where: {
      id,
    },
    select: defaultSelect,
  });
  return {
    ...a,
    price: a.price * 1,
  };
};

export const getRecentZarList = async () => {
  const a: zarSelectType[] = await prisma.zar.findMany({
    select: defaultSelect,
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
  return a.map((item) => {
    return {
      ...item,
      price: item.price * 1,
    };
  });
};
export const getTopZarList = async () => {
  const a: zarSelectType[] = await prisma.zar.findMany({
    select: defaultSelect,
    take: 20,
  });
  return a.map((item) => {
    return {
      ...item,
      price: item.price * 1,
    };
  });
};
