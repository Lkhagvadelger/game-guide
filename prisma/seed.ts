import { Prisma, PrismaClient } from "@prisma/client";
import CSVToJSON from "csvtojson";
import * as bcrypt from "bcryptjs";
import newCats from "../prisma/seed/category.json"
import products from "../prisma/seed/product.json"
import { update } from "lodash";
const prisma = new PrismaClient();
async function generatePasswordDigest() {
  return bcrypt.hash("changeme", 10);
}

//change
async function main() {
  try {
    await prisma.zar.deleteMany({});
    await prisma.promos.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.categoryMain.deleteMany({});
    await prisma.masterData.deleteMany({});
    await prisma.country.deleteMany({});

  } catch (e) { }
  console.log("deleted old data");

  await addCountryAndMainCategory();
  console.log("country and main Category inserted");
  await addMasterData();
  console.log("masterData inserted");

  await addNewCategory();
  console.log("Category inserted");
  await updateCategoryImage();
  console.log("update Category images");
  console.log("added Category zar data");
  await addUserCsvData();
  console.log("User data inserted");
  await addPromo();
  console.log("Promo added");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
async function updateCategoryImage() {
  const arr = [
    {
      "Category_name": "Хувцас хэрэглэл",
      "SVG_icon_names": "t-shirt"
    },
    {
      "Category_name": "Үл хөдлөх",
      "SVG_icon_names": "buildings"
    },
    {
      "Category_name": "Автомашин",
      "SVG_icon_names": "car-side"
    },
    {
      "Category_name": "Ажлын зар",
      "SVG_icon_names": "briefcase-alt"
    },
    {
      "Category_name": "Хүүхдийн бараа",
      "SVG_icon_names": "face-smile-wink"
    },
    {
      "Category_name": "Компьютер сэлбэг хэрэгсэл",
      "SVG_icon_names": "desktop-computer"
    },
    {
      "Category_name": "Утас, дугаар",
      "SVG_icon_names": "mobile-alt-1"
    },
    {
      "Category_name": "Цахилгаан бараа",
      "SVG_icon_names": "printer"
    },
    {
      "Category_name": "Гэр ахуйн бараа",
      "SVG_icon_names": "tv"
    },
    {
      "Category_name": "Төхөөрөмж, материал, түлш",
      "SVG_icon_names": "microchip"
    },
    {
      "Category_name": "Амралт, спорт, хобби",
      "SVG_icon_names": "flag"
    },
    {
      "Category_name": "Эрүүл мэнд, гоо сайхан, хүнс",
      "SVG_icon_names": "monitor-heart-rate"
    },
    {
      "Category_name": "Мал амьтан, ургамал",
      "SVG_icon_names": "cat"
    },
    {
      "Category_name": "Үйлчилгээ",
      "SVG_icon_names": "phone-call-alt-1"
    }
  ]
  await prisma.category.updateMany({
    data: {
      media: {
        icon: 'https://1tseg.mn/categoryIcons/arrow-right.svg',
      },
    },
  });

  arr.forEach(async (item, key) => {
    const category = await prisma.category.findFirst({
      where: {
        name: item.Category_name,
        parentCategoryId: null
      },
    });
    if (category) {
      await prisma.category.update({
        where: {
          id: category.id,
        },
        data: {
          media: {
            icon: 'https://1tseg.mn/categoryIcons/' + item.SVG_icon_names + '.svg',
          },
        },
      });
    }
  })
}
async function addPromo() {
  const data = await CSVToJSON().fromFile("./prisma/seed/promo.csv");
  const country = await prisma.country.findFirst({
    select: { id: true },
  });
  const mainCategoryId = await prisma.categoryMain.findFirst({
    where: {
      title: "Бүтээгдэхүүн",
    },
    select: { id: true },
  });

  if (mainCategoryId && country) {
    // ZarStatus
    // PromoType

    // const jsonReq = "Нийтэлсэн";
    // value: { equals: JSON.stringify(jsonReq) },

    const masterValues = await prisma.masterData.findFirst({
      where: {
        value: "Нийтэлсэн",
      },
      select: {
        id: true,
        value: true,
      },
    });

    console.log(masterValues, "---master");

    if (masterValues) {
      for await (const selItem of data) {
        var newItem = selItem;
        newItem["countryId"] = country.id;
        newItem["categoryMainId"] = mainCategoryId.id;
        newItem["typeMasterId"] = masterValues.id;
        newItem["isActive"] = true;

        await prisma.promos.create({
          data: newItem,
        });
      }
    }

    const homePromoVal = await prisma.masterData.findFirst({
      where: {
        value: "home_banner",
      },
      select: {
        id: true,
        value: true,
      },
    });

    if (homePromoVal) {
      for await (const selItem of data) {
        var newItem = selItem;
        newItem["countryId"] = country.id;
        newItem["categoryMainId"] = mainCategoryId.id;
        newItem["typeMasterId"] = homePromoVal.id;
        newItem["isActive"] = true;

        newItem["media"] = {
          img: "https://jocomgrocery.files.wordpress.com/2020/12/binfinite-save-more-gain-more-poster27-nov-10-dec-2.png",
        };

        await prisma.promos.create({
          data: newItem,
        });
      }
    }
  }
}

async function addMasterData() {
  const data = await CSVToJSON().fromFile("./prisma/seed/masterData.csv");
  const country = await prisma.country.findFirst({
    select: { id: true },
  });
  const mainCategoryId = await prisma.categoryMain.findFirst({
    where: {
      title: "Бүтээгдэхүүн",
    },
    select: { id: true },
  });

  if (mainCategoryId && country) {
    for await (const selItem of data) {
      var newItem = selItem;
      newItem["countryId"] = country.id;

      await prisma.masterData.create({
        data: newItem,
      });
    }
  }
}
async function addNewCategory() {
  const country = await prisma.country.findFirst({
    select: { id: true },
  });
  const mainCategoryId = await prisma.categoryMain.findFirst({
    where: {
      title: "Бүтээгдэхүүн",
    },
    select: { id: true },
  });
  const categories: any = newCats;

  let skipCounter = 0;
  let counter = 1;
  if (country && mainCategoryId)
    Object.keys(newCats).forEach(async (key) => {

      const parent = await prisma.category.create({
        data: {
          name: key,
          countryId: country.id,
          sortIndex: counter++,
          categoryMainId: mainCategoryId?.id,
          isActive: true,
          totalCount: 5 * categories[key].subCategories.length
        },
      });
      let subCounter = 1
      categories[key].subCategories.forEach(async (item: any) => {
        const newCategory = await prisma.category.create({
          data: {
            name: item.name,
            countryId: country.id,
            categoryMainId: mainCategoryId?.id,
            parentCategoryId: parent.id,
            isActive: true,
            sortIndex: subCounter++,
            totalCount: 5
          },
        });
        await addProduct(newCategory.id, parent.id, country.id, skipCounter >= 100 ? skipCounter = 0 : skipCounter += 5)
        if (skipCounter >= 100)
          skipCounter = 0;
      });
    })

}
async function addProduct(categoryId: string, parentCategoryId: string, countryId: string, skip: number) {
  const zars = products.slice(skip, skip + 5).map((item: any) => {
    return {
      title: item.title,
      description: item.description,
      price: new Prisma.Decimal(item.price),
      categoryId,
      categoryIds: [parentCategoryId, categoryId],
      media: {
        images: item.images.map((img: any) => {
          return "https://1tseg.mn/api/forward/images/" + img
        }),
        thumbnail: "https://1tseg.mn/api/forward/images/" + item.thumbnail
      },
      createdAt: new Date(),
      createdBy: "seed",
      countryId
    }
  });

  await prisma.zar.createMany({
    data: zars
  })

}

async function addCountryAndMainCategory() {
  const country = await prisma.country.create({
    data: {
      name: "Mongolia",
      countryCode: "MN",
      languageName: "Монгол",
      isActive: true,
    },
  });
  if (!country) return;

  const data = [
    {
      title: "Бүтээгдэхүүн",
      colorCode: "#002323",
      countryId: country?.id,
      isActive: true,
    },
    {
      title: "Худалдааны төв",
      colorCode: "#002323",
      countryId: country?.id,
      isActive: true,
    },
    // {
    //   title: "Бизнес групп",
    //   colorCode: "#002323",
    //   countryId: country?.id,
    //   isActive: false,
    // },
    // {
    //   title: "Шар ном",
    //   colorCode: "#002323",
    //   countryId: country?.id,
    //   isActive: false,
    // },
    // {
    //   title: "Алибаба",
    //   colorCode: "#002323",
    //   countryId: country?.id,
    //   isActive: false,
    // },
    // {
    //   title: "Мишээл экспо",
    //   colorCode: "#002323",
    //   countryId: country?.id,
    //   isActive: false,
    // },
    // {
    //   title: "Хотхон",
    //   colorCode: "#002323",
    //   countryId: country?.id,
    //   isActive: false,
    // },
  ];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    await prisma.categoryMain.create({
      data: element,
    });
  }
}

async function addUserCsvData() {
  const conceptMaps = await CSVToJSON().fromFile("./prisma/seed/user.csv");

  // console.log(conceptMaps);

  for await (const conceptMap of conceptMaps)
    await prisma.user.create({
      data: {
        ...conceptMap,
        passwordDigest: await generatePasswordDigest(),
      },
    });
}
