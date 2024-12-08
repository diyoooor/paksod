import {
  IconCarrot,
  IconFish,
  IconMeat,
  IconBottle,
  IconEggs,
  IconClockHour3,
} from "@tabler/icons-react";

interface ICategories {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export const categories: ICategories[] = [
  {
    id: 1,
    name: "ผักสด",
    icon: <IconCarrot className="h-9 w-9" stroke={1.5} />,
  },
  {
    id: 2,
    name: "อาหารทะเล",
    icon: <IconFish className="h-9 w-9" stroke={1.5} />,
  },
  {
    id: 3,
    name: "เนื้อสัตว์",
    icon: <IconMeat className="h-7 w-7" stroke={1.5} />,
  },
  {
    id: 4,
    name: "เครื่องปรุง",
    icon: <IconBottle className="h-7 w-7" stroke={1.5} />,
  },
  {
    id: 5,
    name: "ไข่",
    icon: <IconEggs className="h-7 w-7" stroke={1.5} />,
  },
  {
    id: 6,
    name: "ผักดอง",
    icon: <IconClockHour3 className="h-7 w-7" stroke={1.5} />,
  },
];
