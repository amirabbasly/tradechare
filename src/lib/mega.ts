export type MegaLink = { title: string; desc: string; href: string };
export type MegaCol = {
  title: string;
  icon: string;
  desc: string;
  links: MegaLink[];
};

export const MEGA_MENU: MegaCol[] = [
  {
    title: "واردات",
    icon: "ship",
    desc: "از ثبت سفارش تا ترخیص",
    links: [
      {
        title: "ثبت سفارش در سامانه جامع تجارت",
        desc: "آموزش قدم‌به‌قدم ثبت سفارش کالا",
        href: "/blog/order-registration-samane",
      },
      {
        title: "ترخیص کالا از گمرک",
        desc: "راهنمای کامل تشریفات گمرکی",
        href: "/blog/shahid-rajaee-clearance-guide",
      },
      {
        title: "ترخیص خودرو",
        desc: "شرایط، مدارک و هزینه ۱۴۰۵",
        href: "/blog/car-clearance",
      },
      {
        title: "تخصیص ارز نیما و توافقی",
        desc: "مسیر دریافت ارز وارداتی",
        href: "/blog/currency-allocation-import",
      },
    ],
  },
  {
    title: "صادرات",
    icon: "trendUp",
    desc: "از کارت بازرگانی تا رفع تعهد",
    links: [
      {
        title: "صفر تا صد صادرات کالا",
        desc: "نقشه راه کامل صادرات",
        href: "/blog/export-guide",
      },
      {
        title: "رفع تعهد ارزی",
        desc: "آموزش کامل ایفای تعهدات",
        href: "/blog/export-commitment",
      },
      {
        title: "صادرات به عراق",
        desc: "فرصت‌ها و مسیرهای مرزی",
        href: "/blog/export-to-iraq",
      },
      {
        title: "کارت بازرگانی",
        desc: "شرایط، مدارک و تمدید",
        href: "/blog/business-card",
      },
    ],
  },
  {
    title: "خدمات ویژه",
    icon: "star",
    desc: "ابزارها و راهنماهای تخصصی",
    links: [
      {
        title: "قوانین واردات ۱۴۰۵",
        desc: "ممنوعیت‌ها و اولویت‌ها",
        href: "/blog/import-rules-1405",
      },
      {
        title: "بیمه باربری و بازرسی",
        desc: "محافظت از سرمایه شما",
        href: "/blog/cargo-insurance",
      },
      {
        title: "تشخیص کد HS",
        desc: "پیدا کردن تعرفه کالا",
        href: "/blog/find-hs-code",
      },
      {
        title: "تحلیل بازار ارز",
        desc: "بهترین زمان خرید ارز",
        href: "/blog/fx-analysis-importers",
      },
    ],
  },
];
