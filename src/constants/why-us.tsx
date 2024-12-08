import {
  IconTruckDelivery,
  IconSalad,
  IconCurrencyBaht,
} from "@tabler/icons-react";

interface IWhyUs {
  icon: React.ReactNode;
  topic: string;
  description: string;
}

export const whyUs: IWhyUs[] = [
  {
    icon: <IconSalad className="h-32 w-32" stroke={1} />,
    topic: "สดใหม่ทุกวัน",
    description:
      "ผักสดจากฟาร์มที่คัดสรรอย่างดี ส่งตรงถึงร้านทุกวัน เพื่อความสดใหม่และคุณภาพสูงสุดสำหรับลูกค้า",
  },
  {
    icon: <IconTruckDelivery className="h-32 w-32" stroke={1} />,
    topic: "สะดวก รวดเร็ว",
    description:
      "บริการจัดส่งทั้งขายปลีกและส่ง ตรงเวลา รวดเร็ว เพื่อความสะดวกของลูกค้าทุกท่าน",
  },
  {
    icon: <IconCurrencyBaht className="h-32 w-32" stroke={1} />,
    topic: "ราคาย่อมเยา",
    description:
      "เสนอราคาที่คุ้มค่า ทั้งขายปลีกและส่ง พร้อมโปรโมชั่นพิเศษสำหรับลูกค้าประจำ",
  },
];
