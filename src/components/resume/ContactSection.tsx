"use client";

import Image from "next/image";
import Button from "../customButton/Button";
import { Section } from "../layouts/Section";

export default function ContactSection() {
  return (
    <Section delay={0.8}>
      <h2 className="section">Contact</h2>
      <p className="text-center tracking-wide">
        Pour entrer en contact et pour tout renseignement complémentaire,{" "}
        <span className="block">cela se passe ici</span>
      </p>
      <Image
        src="/icons/chevronDown.svg"
        alt="chevrondouble-downIcon"
        width={20}
        height={20}
        className="mx-auto mt-4 animate-bounce dark:invert"
      />
      <Button path="/contact" goMail={true}>
        Me contacter
      </Button>
    </Section>
  );
}
