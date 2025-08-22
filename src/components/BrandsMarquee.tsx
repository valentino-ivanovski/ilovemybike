"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function BrandsMarquee({ logos }: { logos: string[] }) {
  return (
    <section className="flex flex-col items-center justify-center w-full h-20 md:h-40">
      <Marquee>
        {logos.map((logo, index) => (
          <div key={index} className="md:mx-13 mx-10">
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}